/* eslint-disable react/prop-types */
const CategoryCard = ({ category, handleCategory }) => {
  return (
    <div>
      <img
        className={`${
          handleCategory ? "border-2 border-c-primary" : ""
        } w-24 aspect-square object-center object-cover rounded-full mb-1`}
        src={category.image.secure_url}
        alt={category.title}
      />
      <p className="text-center text-xs capitalize">{category.title}</p>
    </div>
  );
};

export default CategoryCard;
