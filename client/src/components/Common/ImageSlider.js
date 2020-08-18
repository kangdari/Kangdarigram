import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import ec2 from "../../utils/ec2";

const ImageSlider = ({ images, home }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const preBtn = useRef(null);
  const nextBtn = useRef(null);
  const TOTAL_SLIDES = images.length;

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentIndex}00%)`;

    if (currentIndex === TOTAL_SLIDES - 1) {
      nextBtn.current.style.display = "none";
    } else {
      nextBtn.current.style.display = "block";
    }

    if (currentIndex === 0) {
      preBtn.current.style.display = "none";
    } else {
      preBtn.current.style.display = "block";
    }
  }, [currentIndex, TOTAL_SLIDES]);

  const nextSlide = () => {
    if (TOTAL_SLIDES - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <ImageSliderBlock home={home}>
      <div className="box">
        <div className="padding"></div>
        <div className="image_slider_box">
          <div className="image_box" ref={slideRef}>
            {images.map((image, index) => (
              <img
                key={index}
                // src={`http://localhost:5050/${image}`}
                src={`${ec2}/${image}`}
                alt="img"
              />
            ))}
          </div>
        </div>
        <SlideButton className="left" onClick={prevSlide} ref={preBtn}>
          <FontAwesomeIcon className="icon" icon={faArrowCircleLeft} />
        </SlideButton>
        <SlideButton className="right" onClick={nextSlide} ref={nextBtn}>
          <FontAwesomeIcon className="icon" icon={faArrowCircleRight} />
        </SlideButton>
      </div>
    </ImageSliderBlock>
  );
};

const ImageSliderBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* ImageSlider는 HomePage, PostDetailPage에서 사용.
  HomePage에서는 margin 값 적용 x */
  margin-right: ${(props) => (props.home ? 0 : "335px")};
  min-height: 450px;
  background: #000;

  .box {
    position: relative;
    left: 0;
    top: 0;
  }

  .box .padding {
    padding-bottom: 100%;
  }

  .box .image_slider_box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    /* 스크롤 숨기기 */
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    /* FireFox */
    scrollbar-width: none;
  }

  .box .image_slider_box .image_box {
    /* 스크롤 */
    display: flex;
    width: 100%;
    height: 100%;
  }

  .box .image_slider_box .image_box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media screen and (max-width: 736px) {
    display: block;
    margin-right: 0;
    background: transparent;
    min-height: inherit;
  }
`;

const SlideButton = styled.button`
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  padding: 8px;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  .icon {
    font-size: 1.5rem;
    color: #fff;
  }
`;

export default ImageSlider;
