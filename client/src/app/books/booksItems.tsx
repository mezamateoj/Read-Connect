import React from 'react';
import Image from 'next/image';
import { BooksProps } from './books';

export default function BooksItems({ b }: { b: BooksProps }) {
	return (
		<li className="flex list-none gap-4 py-2">
			{b.thumbnailUrl && (
				<Image
					src={b.thumbnailUrl}
					alt={b.title}
					width={75}
					height={96}
					className={`h-24 ${
						b.status !== 'PUBLISH' ? 'opacity-70 grayscale' : ''
					}`}
				/>
			)}

			<div className="flex flex-grow flex-col pt-0.5">
				<p className="font-medium">
					{b.title},{' '}
					<span className="text-sm font-light">
						{b.publishedDate}
					</span>
				</p>
				<p className="text-sm capitalize  text-stone-800">
					{b.authors.join(', ') || 'Unknown author'}{' '}
				</p>
				<span className="text-sm capitalize italic text-stone-500">
					Category: {b.categories}
				</span>

				<p className="text-sm ">{b.shortDescription}</p>
				{/* <div className="mt-auto flex items-center justify-between">
            {!soldOut ? (
              <p className="text-sm">{formatCurrency(unitPrice)}</p>
            ) : (
              <p className="text-sm font-medium uppercase text-stone-500">
                Sold out
              </p>
            )}
            {!soldOut ? (
              currentQuantity === 0 ? (
                <Button type="small" onClick={handleAddCart}>
                  Add to cart
                </Button>
              ) : (
                <div className="flex flex-row-reverse items-center gap-3">
                  <DeleteItem pizzaId={id} name={name} />
                  <UpdateItemQuantity pizzaId={id} />
                </div>
              )
            ) : (
              <Button type="small" disabled>
                Sold out
              </Button>
            )}
          </div> */}
			</div>
		</li>
	);
}
