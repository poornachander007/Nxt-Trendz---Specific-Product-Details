// Write your code here
import './index.css'

const starUrl = 'https://assets.ccbp.in/frontend/react-js/star-img.png'

const SimilarProductItem = props => {
  const {details} = props
  const updatedDetails = {
    id: details.id,
    imageUrl: details.image_url,
    title: details.title,
    style: details.style,
    price: details.price,
    description: details.description,
    brand: details.brand,
    totalReviews: details.total_reviews,
    rating: details.rating,
    availability: details.availability,
  }

  console.log('-----------SimilarProductItem-----------------------')
  console.log(updatedDetails)
  console.log('---------SimilarProductItem-------------------------')
  const {
    id,
    imageUrl,
    title,
    price,
    style,
    description,
    brand,
    totalReviews,
    rating,
    availability,
  } = updatedDetails
  return (
    <li className="li_card_container">
      <img
        className="similar_product_img"
        src={imageUrl}
        alt={`similar product ${title}`}
      />
      <h1 className="similar_title">{title}</h1>
      <p className="similar_brand">by {brand}</p>
      <div className="price_and_rating_container">
        <p className="similar_price">Rs {price}/- </p>
        <div className="star_and_rating_container">
          <p className="similar_rating">{rating}</p>
          <img className="star_icon" src={starUrl} alt="star" />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
