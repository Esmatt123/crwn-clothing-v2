import { CategoryItem } from "../../store/categories/category.type";

import { FC } from "react";

import { selectCartItems } from "../../store/cart/cart.selector";

import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../../store/cart/cart.action";

//import { useContext } from "react";

//import { CartContext } from "../../context/cart-context.component";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  ProductCartContainer,
  Name,
  Price,
  Footer,
} from "./product-card.styles";

type ProductCardProps = {
  product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  //const { addItemToCart } = useContext(CartContext);

  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
