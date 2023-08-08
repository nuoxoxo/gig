var RouteCats = () => {

  const L:string = 'https://cdn.freecodecamp.org/curriculum/css-photo-gallery/'
  const Urls = Array.from(
    { length: 9 }, (_, idx) => L + `${idx + 1}` + '.jpg'
  )

  return (
    <>
      <div className="gallery">

        {Urls.map((url, idx) => (
          <img key={idx} src={url} />
        ))}

        {/* 
        <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/1.jpg" />
        <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/2.jpg" />
        <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/3.jpg" />
        <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/4.jpg" />
        <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/5.jpg" />
        <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/6.jpg" />
        <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/7.jpg" />
        <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/8.jpg" />
        <img src="https://cdn.freecodecamp.org/curriculum/css-photo-gallery/9.jpg" />
        */}

      </div>
    </>
  )
}

export default RouteCats
