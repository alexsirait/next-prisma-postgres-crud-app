'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function DelProduct({ product }: { product: any }) {
	const [modal, setModal] = useState(false);
	const router = useRouter();
	const onsubmit = async (id: number) => {
		await axios.delete(`/api/products/${id}`);
		setModal(false);
		router.refresh();
	};
	return (
		<>
			<button className="btn btn-error btn-sm" onClick={() => setModal(!modal)}>
				Delete
			</button>
			<div className={modal ? 'modal modal-open' : 'modal'}>
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						Delete Product {product.title} - {product.id}
					</h3>
					<div className="modal-action">
						<button
							className="btn"
							type="button"
							onClick={() => setModal(false)}
						>
							Close
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={async () => await onsubmit(product.id)}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
