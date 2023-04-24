'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, SyntheticEvent } from 'react';

export default function AddProduct({ brands }: { brands: any[] }) {
	const [modal, setModal] = useState(false);
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const [brand, setBrand] = useState('');
	const router = useRouter();

	const onsubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		await axios.post('/api/products', {
			title: title,
			price: Number(price),
			brandId: Number(brand),
		});
		setTitle('');
		setPrice('');
		setBrand('');
		setModal(false);
		router.refresh();
	};
	return (
		<>
			<button className="btn" onClick={() => setModal(!modal)}>
				Add new
			</button>
			<div className={modal ? 'modal modal-open' : 'modal'}>
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add New Product</h3>
					<form onSubmit={onsubmit}>
						<div className="form-control w-full">
							<label className="label font-bold">Product Name</label>
							<input
								type="text"
								className="input input-bordered"
								placeholder="Product Name .."
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="form-control w-full">
							<label className="label font-bold">Price</label>
							<input
								type="text"
								className="input input-bordered"
								placeholder="Price .."
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
						<div className="form-control w-full">
							<label className="label font-bold">Brand</label>
							<select
								className="select select-bordered"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							>
								<option disabled>Select a Brand</option>
								{brands.map((brand, index) => (
									<option key={index} value={brand.id}>
										{brand.name}
									</option>
								))}
							</select>
						</div>
						<div className="modal-action">
							<button
								type="button"
								className="btn"
								onClick={() => setModal(!modal)}
							>
								Close
							</button>
							<button type="submit" className="btn btn-primary">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
