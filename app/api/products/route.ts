import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const POST = async (req: Request) => {
	const body = await req.json();
	const product = await prisma.product.create({
		data: {
			title: body.title,
			price: body.price,
			brandId: body.brandId,
		},
	});
	return NextResponse.json(product);
};
