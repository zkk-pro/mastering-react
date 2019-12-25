import React from 'react';

const ProductsDetail = (props) => {
return ( <div>ProductsDetail id is: {props.match.params.id}</div> );
}
 
export default ProductsDetail;