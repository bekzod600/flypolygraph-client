/* eslint-disable react/prop-types */
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
const Cards = (props) => {
  return (
    <>
      {!props.loading ? (
        props?.products?.length ? (
          <div className="cards pt-0 pb-6 grid grid-cols-3 gap-x-4 gap-y-6">
            {props?.products?.map((val) => {
              return <Card key={val._id} product={val} />;
            })}
          </div>
        ) : (
          <p className="text-center pt-5 text-2xl font-bold uppercase">product not found</p>
        )
      ) : (
        <div className="cards pt-0 pb-6 grid grid-cols-3 gap-x-4 gap-y-6">
          {new Array(6).fill(0).map((v, i) => {
            return <CardSkeleton key={i} />;
          })}
        </div>
      )}
    </>
  );
};

export default Cards;
