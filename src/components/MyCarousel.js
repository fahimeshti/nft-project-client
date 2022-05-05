import './MyCarousel.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import HotDrops from './HotDrops';

const MyCarousel = (props) => {

    const products = props.products

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
        <Carousel 
        responsive={responsive}
        infinite={true}
        itemclassName="carousel-item-padding"
        containerclassName="carousel-container"
        >
          <HotDrops 
              title={products[3]?.title} 
              creator={products[3]?.creator} 
              price={products[3]?.price} 
              image={products[3]?.img}
              creatorImg={products[3]?.creatorImg}
               />
          <HotDrops 
              title={products[5]?.title} 
              creator={products[5]?.creator} 
              price={products[5]?.price} 
              image={products[5]?.img}
              creatorImg={products[5]?.creatorImg}
               />
          <HotDrops 
              title={products[2]?.title} 
              creator={products[2]?.creator} 
              price={products[2]?.price} 
              image={products[2]?.img}
              creatorImg={products[2]?.creatorImg}
               />
        </Carousel>
    );
};

export default MyCarousel;