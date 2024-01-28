import React, { useContext ,useEffect ,useState} from "react";
import CartIcon from "../assets/CartIcon";
import StarsRating from "./StarsRating.jsx";
import { Link } from "react-router-dom";
// import { CartContext } from "../Context/CartContext.jsx";
// import { setAddedToCart } from "../Context/CartContext.jsx";

const ProductCart = ({ products }) => {
    const [addedToCart, setAddedToCart] = useState([]);



    useEffect(() => {
        // Retrieve the cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setAddedToCart(cartItems);
    }, []);
    const addToCart = (productId) => {
        const addedToCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!addedToCart.includes(productId)) {
            // Add the product_ID to the local storage
            localStorage.setItem("cart", JSON.stringify([...addedToCart, productId]));
            setAddedToCart([...addedToCart, productId]);
        }
    };
    
    return (
        
        
        <div className="grid grid-cols-5  gap-4 p-16 ">
            {products.map((product) => (
             
                <div key={product.product_ID} className="flex flex-col relative">
                    <Link exact='true' to={`http://localhost:5173/product/${product.product_ID}`} >
                    <img
                        src={product.Images[0].Image_URL.slice(18)}
                        alt="Product Image"
                        className="max-h-36"
                    />
                    </Link>
                    {product.OldPrice > product.Price && (
                        <span className="absolute left-1 top-1 bg-[#DB4444] text-xs text-white rounded-sm py-1 px-2 font-semibold">
                            -{Math.ceil(
                                (100 * (product.OldPrice - product.Price)) / product.OldPrice
                            )}
                            %
                        </span>
                    )}
                    
                    <button
                        className={`flex items-center justify-center gap-2 p-1 text-white ${addedToCart &&
                            addedToCart.includes(product.product_ID)
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-black hover:bg-slate-900"
                        } transition-colors`}
                        onClick={() => addToCart(product.product_ID)}
                        disabled={addedToCart.includes(product.product_ID)}
                    >
                        <CartIcon className="text-white" stroke="white" />
                        <span className="text-sm">
                            {addedToCart.includes(product.product_ID)
                                ? "Added to Cart"
                                : "Add To Cart"}
                        </span>
                    </button>
                    <h2 className="mt-1 text-sm font-semibold">
                        {product.product_Name}
                    </h2>
                    <p className="text-xs">{product.Description}</p>
                    <div className="flex gap-2">
                        {product.Price && (
                            <>
                                <span className="text-xs text-[#DB4444] font-semibold">
                                    {product.Price} DA
                                </span>
                            </>
                        )}
                        {product.OldPrice && product.OldPrice !== product.Price && (
                            <span className="text-xs font-semibold opacity-50 line-through">
                                {product.OldPrice}DA
                            </span>
                        )}
                    </div>
                    {product.AverageStars && (
                        <StarsRating rating={product.AverageStars} />
                    )}
                </div>
                
            ))}
        </div>
    );
};

export default ProductCart;
