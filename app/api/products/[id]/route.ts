import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const PUT = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	const data = await req.json();
	const product = await prisma.product.update({
		where: {
			id: Number(params.id),
		},
		data: {
			title: data.title,
			price: data.price,
			brandId: data.brandId,
		},
	});
	return NextResponse.json(product);
};

export const DELETE = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	const product = await prisma.product.delete({
		where: {
			id: Number(params.id),
		},
	});
	return NextResponse.json(product);
};
