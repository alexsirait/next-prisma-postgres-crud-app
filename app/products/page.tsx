import { PrismaClient } from '@prisma/client';
import AddProduct from './addProduct';
import DelProduct from './delProduct';
import UpProduct from './upProduct';
const prisma = new PrismaClient();

const getProducts = async () => {
	const res = await prisma.product.findMany({
		select: { id: true, title: true, price: true, brandId: true, brand: true },
	});
	return res;
};

const getBrand = async () => {
	const res = await prisma.brand.findMany({
		select: {
			name: true,
			id: true,
		},
	});
	return res;
};

export default async function Product() {
	const [products, brands] = await Promise.all([getProducts(), getBrand()]);

	return (
		<>
			<div className="mb-2">
				<AddProduct brands={brands} />
			</div>
			<table className="table w-full">
				<thead>
					<tr>
						<td>#</td>
						<td>Product Name</td>
						<td>Price</td>
						<td>Brand</td>
						<td className="text-center">Action</td>
					</tr>
				</thead>
				<tbody>
					{products.map((product: any, index: number) => (
						<tr key={index}>
							<td>{++index}</td>
							<td>{product.title}</td>
							<td>{product.price}</td>
							<td>{product.brand.name}</td>
							<td className="flex items-center gap-x-2">
								<UpProduct brands={brands} product={product} />
								<DelProduct product={product} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
