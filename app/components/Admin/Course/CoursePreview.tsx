import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "../../../../app/styles/style";
import Ratings from "../../../../app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { formatPrice } from "@/app/utils/formatPrice";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit,
}) => {
  const dicountPercentenge =
    ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="m-auto mb-5 w-[90%] py-5">
      <div className="relative w-full">
        <div className="mt-10 w-full">
          <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.title} />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px] text-black dark:text-white">
            {courseData?.price === 0 ? "Miễn phí" : formatPrice(courseData?.price) + "đ"}
          </h1>
          <h5 className="mt-2 pl-3 text-[20px] text-black line-through opacity-80 dark:text-white">
            {courseData?.estimatedPrice && formatPrice(courseData.estimatedPrice) + "đ"}
          </h5>

          <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
            Giảm {discountPercentengePrice}%
          </h4>
        </div>

        <div className="flex items-center">
          <div className={`${styles.button} my-3 !w-[180px] cursor-not-allowed !bg-[crimson]`}>
            Mua ngay
          </div>
        </div>

        {/* <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Mã giảm giá..."
            className={`${styles.input} !mt-0 ml-3 1100px:w-[60%] 1500px:!w-[50%]`}
          />
          <div className={`${styles.button} my-3 ml-4 !w-[120px] cursor-pointer`}>
            Áp dụng
          </div>
        </div> */}
        {/* <p className="pb-1">• Source code included</p> */}
        <p className="pb-1 text-black dark:text-white">• Truy cập suốt đời</p>
        {/* <p className="pb-1">• Chứng chỉ hoàn thành</p> */}
        <p className="pb-3 text-black dark:text-white 800px:pb-1">• Hỗ trợ tận tình</p>
      </div>
      <div className="w-full text-black dark:text-white">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-[600] text-black dark:text-white">{courseData?.name}</h1>
          <div className="flex items-center justify-between pt-3 text-black dark:text-white">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Đánh giá</h5>
            </div>
            <h5>0 Người đăng ký</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-[600]">Những gì bạn sẽ học được từ khóa học này?</h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="flex w-full py-2 800px:items-center" key={index}>
            <div className="mr-1 w-[15px]">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className="text-[25px] font-[600]">Những điều kiện để bắt đầu khóa học này?</h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="flex w-full py-2 800px:items-center" key={index}>
            <div className="mr-1 w-[15px]">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        {/* course description */}
        <div className="w-full">
          <h1 className="text-[25px] font-[600]">Mô tả khóa học</h1>
          <p className="mt-[20px] w-full overflow-hidden whitespace-pre-line text-[18px]">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="flex w-full items-center justify-between">
        <div
          className="mt-8 flex h-[40px] w-full cursor-pointer items-center justify-center rounded bg-[#37a39a] text-center text-[#fff] 800px:w-[180px]"
          onClick={() => prevButton()}
        >
          Trở lại
        </div>
        <div
          className="mt-8 flex h-[40px] w-full cursor-pointer items-center justify-center rounded bg-[#37a39a] text-center text-[#fff] 800px:w-[180px]"
          onClick={() => createCourse()}
        >
          {isEdit ? "Cập nhật" : "Tạo mới"}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
