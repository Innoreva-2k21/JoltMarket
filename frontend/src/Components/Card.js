
const Card=()=> {
    return(<>
    <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      Product
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>Price</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Add to cart</div>
      <div className="badge badge-outline">Buy now</div>
    </div>
  </div>
</div>
    </>
    )
  }

  export default Card;
