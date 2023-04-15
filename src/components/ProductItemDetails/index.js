// Write your code here
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusViews = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

const starUrl = 'https://assets.ccbp.in/frontend/react-js/star-img.png'

class ProductItemDetails extends Component {
  state = {
    apiStatus: apiStatusViews.initial,
    count: 1,
    productItem: {},
  }

  componentDidMount() {
    this.getProductItem()
  }

  getProductItem = async () => {
    this.setState({apiStatus: apiStatusViews.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,

        similarProducts: data.similar_products,
      }
      this.setState({
        productItem: updatedData,
        apiStatus: apiStatusViews.success,
      })
      console.log('^^^^^^^^^^^^^^^^main data api call^^^^^^^^^^^^^^^^^^^^^')
      console.log(updatedData)
      console.log('^^^^^^^^^^^^^^^ main data api call^^^^^^^^^^^^^^^^^^^^^^')
    } else {
      this.setState({apiStatus: apiStatusViews.failure})
    }
  }

  //   ------------------------------------------------------------------------

  renderSimilarProducts = () => {
    const {productItem} = this.state
    const {similarProducts} = productItem
    console.log(similarProducts, '------------------render similar produscts')
    return (
      <ul className="ul_similar_items_container">
        {similarProducts.map(eachItem => (
          <SimilarProductItem details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  onDecrement = () => {
    const {count} = this.state
    if (count !== 1) {
      this.setState(preState => ({
        count: preState.count - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(preState => ({
      count: preState.count + 1,
    }))
  }

  renderProductDetails = () => {
    const {productItem, count} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productItem
    console.log('-----------------similarProducts API-----------------------')
    console.log(similarProducts)
    console.log('------------------similarProducts API----------------------')
    return (
      <div className="products_render_container">
        <div className="product_image_and_details_container">
          <img className="product_image" src={imageUrl} alt="product" />
          <div className="product_details_container">
            <h1 className="product_title">{title}</h1>
            <p className="product_price">Rs {price}/- </p>
            <div className="rating_and_reviews_container ">
              <div className="rating_and_star">
                <p className="product_rating">{rating}</p>
                <img className="product_star_img" src={starUrl} alt="star" />
              </div>
              <p className="product_totalReviews">{totalReviews} Reviews</p>
            </div>
            <p className="product_description">{description}</p>
            <p className="product_available">Available: {availability}</p>
            <p className="product_brand">Brand: {brand}</p>
            <hr className="hr_line" />
            <div className="plus_minus_container">
              <button
                onClick={this.onDecrement}
                type="button"
                data-testid="minus"
                className="plusMinus_button"
              >
                <BsDashSquare className="plus_minus_component" />
              </button>
              <p className="product_count"> {count}</p>
              <button
                onClick={this.onIncrement}
                type="button"
                data-testid="plus"
                className="plusMinus_button"
              >
                <BsPlusSquare />
              </button>
            </div>
            <div className="add_to_btn_container">
              <button className="add_to_cart_btn" type="button">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {this.renderSimilarProducts()}
      </div>
    )
  }

  //   ------------------------------------------------------------------------

  onClickContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" width={50} height={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        width={600}
      />
      <h1>Product Not Found</h1>
      <div>
        <button onClick={this.onClickContinueShopping} type="button">
          Continue Shopping
        </button>
      </div>
    </div>
  )

  renderProductComponentViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusViews.in_progress:
        return this.renderLoadingView()

      case apiStatusViews.success:
        return this.renderProductDetails()

      case apiStatusViews.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderProductComponentViews()}
      </>
    )
  }
}

export default ProductItemDetails
