import prisma from '@lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    const orders = await prisma.order.findMany({
      where: {
        email: session.user.email,
        paymentStatus: 'TXN_SUCCESS',
      },
    });

    return res.status(200).json({
      msg: 'success',
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
