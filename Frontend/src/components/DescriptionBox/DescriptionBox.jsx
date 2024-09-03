import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>

        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Corporis rerum facilis dolorum nulla tenetur dicta excepturi
                 alias! Architecto, autem cupiditate! Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                 Quam reprehenderit in praesentium totam, doloribus pariatur officia possimus nemo velit quidem.
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, molestias.
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, animi.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia minima qui debitis illum, ab
                 delectus animi culpa cumque magni dolore pariatur ad, vitae voluptates architecto facilis recusandae
                  repudiandae impedit est. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, omnis.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox