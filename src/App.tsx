import ImageSlider from "./components/image-slider";


export default function App() {

  const url = 'https://picsum.photos/v2/list'

  return (
    <>
      <ImageSlider url={url} />
    </>
  )
}