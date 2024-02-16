import { useEffect, useState } from "react"
import { BsArrowLeftCircleFill, BsArrowLeftCircle, BsArrowRightCircle, BsArrowRightCircleFill } from 'react-icons/bs'
import './style.scss'

export default function ImageSlider({ url, page = 1, limit = 10 }: { url: string, page?: number, limit?: number }) {

    const [images, setImages] = useState<{ id: number, download_url: string }[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchImages(getUrl: string) {
        try {
            setLoading(true);

            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();
            if (data) {
                setImages(data);
            }

        } catch (ex) {
            if (ex instanceof Error) setErrorMsg(ex.message);
        }

        setLoading(false);
    }

    useEffect(() => {

        if (url !== '') fetchImages(url);

    }, [url]);


    function handlePrevClick() {
        if (currentSlide > 0)
            setCurrentSlide(currentSlide - 1);
    }

    function handleNextClick() {
        if (currentSlide < images.length - 1)
            setCurrentSlide(currentSlide + 1);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (errorMsg !== null) {
        return <div>Error: {errorMsg}</div>
    }

    return (
        <>
            <div className="container">
                {currentSlide == 0 ? <BsArrowLeftCircle className="arrow arrow-left" /> :
                    <BsArrowLeftCircleFill className="arrow arrow-left"
                        onClick={handlePrevClick} />}
                {
                    images != null && images.length > 0 && images.map(imageItem =>
                        <img key={imageItem.id}
                            alt={imageItem.download_url}
                            src={imageItem.download_url}
                            className={currentSlide == imageItem.id ? 'current-slide-image slide-image' : 'slide-image'} />
                    )
                }
                {currentSlide >= images.length - 1 ? <BsArrowRightCircle className="arrow arrow-right" /> :
                    <BsArrowRightCircleFill className="arrow arrow-right"
                        onClick={handleNextClick} />}

                <span className="circle-indicators">
                    {
                        images && images.length ? images.map((_, index) =>
                            <button key={index}
                                className={index == currentSlide ? 'image-indicator current-image-indicator' : 'image-indicator'} />)
                            : null
                    }
                </span>
            </div>
        </>
    )
}