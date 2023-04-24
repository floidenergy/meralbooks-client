import React from 'react';
import { Link } from 'react-router-dom';

import "./sass/home.css"

//images.svg
import fastDelivery from '../images/SVG/fast Delivery.svg';
import payAtDelivery from '../images/SVG/pay at delivery.svg';
import shild from '../images/SVG/shild.svg';
import validation from '../images/SVG/validation.svg';

import aboutImage from '../images/AboutImage.jpg'

import book1 from '../images/booksImageTemp/book1.jpg'
import book2 from '../images/booksImageTemp/book2.jpg'
import book3 from '../images/booksImageTemp/book3.jpg'
import book4 from '../images/booksImageTemp/book4.jpg'
import book5 from '../images/booksImageTemp/book5.jpg'

const Home = () => {
    return (
        <main className='black'>
            <header className='hero white'>
                <p className='heroTitle'>Welcome To <span className='bold'>MERAL BOOKS.</span></p>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt<br/>
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation<br/>
ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in<br/>
reprehenderit</p>
                <Link to={'/Store'} className='button b-white purple bold'>Get Me Book</Link>
            </header>

            <section className="benefits">
                <article>
                    <img className='benefits-img' src={fastDelivery} alt="fast delivery" />
                    <p className="benefits-title bold">Quick Delivery</p>
                    <p className="description">Lorem Ipsum Dolor Sit Amet,Consectetur Adipiscing Elit,Sed Do Eiusmod TemporIncididunt Ut Labore Et DoloreMagna Aliqua. Ut Enim</p>
                </article>
                <article>
                    <img className='benefits-img' src={payAtDelivery} alt="In Delivery Payment" />
                    <p className="benefits-title bold">In Delivery Payment</p>
                    <p className="description">Lorem Ipsum Dolor Sit Amet,Consectetur Adipiscing Elit,Sed Do Eiusmod TemporIncididunt Ut Labore Et DoloreMagna Aliqua. Ut Enim</p>
                </article>
                <article>
                    <img className='benefits-img' src={validation} alt="Best Quality" />
                    <p className="benefits-title bold">Best Quality</p>
                    <p className="description">Lorem Ipsum Dolor Sit Amet,Consectetur Adipiscing Elit,Sed Do Eiusmod TemporIncididunt Ut Labore Et DoloreMagna Aliqua. Ut Enim</p>
                </article>
                <article>
                    <img className='benefits-img' src={shild} alt="return Guarantee" />
                    <p className="benefits-title bold">return Guarantee</p>
                    <p className="description">Lorem Ipsum Dolor Sit Amet,Consectetur Adipiscing Elit,Sed Do Eiusmod TemporIncididunt Ut Labore Et DoloreMagna Aliqua. Ut Enim</p>
                </article>
            </section>

            <section className="about b-white">
                <div className="info">
                    <p className="detail purple bold">About</p>
                    <h2 className='bold title'>We Provide<br/>Incredible Experience</h2>
                    <p className="description">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed<br/>Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna,<br/>Aliqua. Ut Enim</p>
                    <Link to={"/About"} className="button white b-purple ">Take a look</Link>
                </div>
                <img className='aboutImage' src={aboutImage} alt="" />
            </section>

            <section className="Collection b-dark-white">
                <div className="info">
                    <p className="detail purple bold">Collection</p>
                    <h2 className='bold title'>Our Best<br/>Sellings</h2>
                    <p className="description">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed<br/>Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna,<br/>Aliqua. Ut Enim</p>
                    <Link to={"/Store"} className="button white b-purple ">Get me a book</Link>
                </div>
                <div className="CollectionImage">
                    <img src={book1} alt="" />
                    <img src={book2} alt="" />
                    <img src={book3} alt="" />
                    <img src={book4} alt="" />
                    <img src={book5} alt="" />
                    <img src={book1} alt="" />
                </div>
            </section>

            <section className="how-we-work">
                <div className="info">
                    <p className="detail purple bold">How We Work</p>
                    <h2 className='bold title'>Explore Our<br/>Processes</h2>
                    <div className="icons-cards">
                        <div className="card">
                            
                        </div>
                    </div>
                </div>
                <div className="benifits">

                </div>
            </section>
        </main>
    );
}

export default Home;
