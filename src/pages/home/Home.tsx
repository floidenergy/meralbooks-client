import { Link } from 'react-router-dom'

// import "../css/home.css"
import Style from './home.module.css'

// images.svg
import fastDelivery from '../../images/SVG/fast Delivery.svg'
import payAtDelivery from '../../images/SVG/pay at delivery.svg'
import shild from '../../images/SVG/shild.svg'
import validation from '../../images/SVG/validation.svg'

import aboutImage from '../../images/AboutImage.jpg'

import book1 from '../../images/booksImageTemp/book1.jpg'
import book2 from '../../images/booksImageTemp/book2.jpg'
import book3 from '../../images/booksImageTemp/book3.jpg'
import book4 from '../../images/booksImageTemp/book4.jpg'
import book5 from '../../images/booksImageTemp/book5.jpg'

import ChooseYourBook from '../../images/SVG/Choose_Your_Book.svg'
import MakeYourOrder from '../../images/SVG/make_your_order.svg'
import CashAtDelivery from '../../images/SVG/delivery_cash_black.svg'

import benifitsPic from '../../images/pexels-vlada-karpovich-4050348.jpg'

import user1 from '../../images/user/user1.jpg'
import user2 from '../../images/user/user2.jpg'
import user3 from '../../images/user/user3.jpg'
import NavBar from '../../elements/navBar/navBar'
import Footer from '../../elements/footer/Footer'

const Home = () => {
  return (
    <div>
      <NavBar />
      <main className='black'>
        <header className={Style.hero + ' white'}>
          <p className={Style.heroTitle}>
            Welcome To
            <span className='bold'>MERAL BOOKS.</span>
          </p>
          <p className={Style.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
            <br />
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation
            <br />
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in
            <br />
            reprehenderit
          </p>
          <Link to={'/Store'} className='button b-white purple bold'>
            Get Me Book
          </Link>
        </header>

        <div className={Style.benefits + ' b-dark-white'}>
          <article>
            <img
              className={Style.benefits_img}
              src={fastDelivery}
              alt='fast delivery'
            />
            <p className={Style.benefits_title + ' bold'}>Quick Delivery</p>
            <p className={Style.description}>
              Lorem Ipsum Dolor Sit Amet,Consectetur Adipiscing Elit,Sed Do
              Eiusmod TemporIncididunt Ut Labore Et DoloreMagna Aliqua. Ut Enim
            </p>
          </article>
          <article>
            <img
              className={Style.benefits_img}
              src={payAtDelivery}
              alt='In Delivery Payment'
            />
            <p className={Style.benefits_title + ' bold'}>
              In Delivery Payment
            </p>
            <p className={Style.description}>
              Lorem Ipsum Dolor Sit Amet,Consectetur Adipiscing Elit,Sed Do
              Eiusmod TemporIncididunt Ut Labore Et DoloreMagna Aliqua. Ut Enim
            </p>
          </article>
          <article>
            <img
              className={Style.benefits_img}
              src={validation}
              alt='Best Quality'
            />
            <p className={Style.benefits_title + ' bold'}>Best Quality</p>
            <p className={Style.description}>
              Lorem Ipsum Dolor Sit Amet,Consectetur Adipiscing Elit,Sed Do
              Eiusmod TemporIncididunt Ut Labore Et DoloreMagna Aliqua. Ut Enim
            </p>
          </article>
          <article>
            <img
              className={Style.benefits_img}
              src={shild}
              alt='return Guarantee'
            />
            <p className={Style.benefits_title + ' bold'}>return Guarantee</p>
            <p className={Style.description}>
              Lorem Ipsum Dolor Sit Amet,Consectetur Adipiscing Elit,Sed Do
              Eiusmod TemporIncididunt Ut Labore Et DoloreMagna Aliqua. Ut Enim
            </p>
          </article>
        </div>

        <section className={Style.about + '  b-white'}>
          <div className='info'>
            <p className={Style.section_detail + ' purple bold'}>About</p>
            <h2 className='bolder title'>
              We Provide
              <br />
              Incredible Experience
            </h2>
            <p className={Style.description}>
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed
              <br />
              Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna,
              <br />
              Aliqua. Ut Enim
            </p>
            <Link to={'/About'} className='button white b-purple '>
              Take a look
            </Link>
          </div>
          <img className={Style.aboutImage} src={aboutImage} alt='' />
        </section>

        <section className={Style.Collection + ' b-dark-white'}>
          <div className={Style.info}>
            <p className={Style.section_detail + ' purple bold'}>Collection</p>
            <h2 className='bold title'>
              Our Best
              <br />
              Sellings
            </h2>
            <p className={Style.description}>
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed
              <br />
              Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna,
              <br />
              Aliqua. Ut Enim
            </p>
            <Link to={'/Store'} className='button white b-purple '>
              Get me a book
            </Link>
          </div>
          <div className={Style.CollectionImage}>
            <img src={book1} alt='' />
            <img src={book2} alt='' />
            <img src={book3} alt='' />
            <img src={book4} alt='' />
            <img src={book5} alt='' />
            <img src={book1} alt='' />
          </div>
        </section>

        <section className={Style.how_we_work}>
          <div className={Style.info}>
            <p className={Style.section_detail + ' purple bold'}>How We Work</p>
            <h2 className='bold title'>Explore Our Processes</h2>
          </div>

          <div className={Style.hwwContainer}>
            <div className={Style.icons_cards}>
              <div className={Style.card + ' b-dark-white'}>
                <div className={Style.imageBackground}>
                  <img src={ChooseYourBook} className={Style.card_icon} />
                </div>
                <p className={Style.card_title + ' bold'}>Choose Your Book</p>
                <p className={Style.card_description}>
                  Lorem ipsum dolor sit amet, laudem tamquam ullamcorper at pri,
                  partem libris mea id. Vix no odio quas probo,
                </p>
              </div>

              <div className={Style.card + ' b-dark-white'}>
                <div className={Style.imageBackground}>
                  <img src={MakeYourOrder} className={Style.card_icon} />
                </div>
                <p className={Style.card_title + ' bold'}>Make Your Order</p>
                <p className={Style.card_description}>
                  Lorem ipsum dolor sit amet, laudem tamquam ullamcorper at pri,
                  partem libris mea id. Vix no odio quas probo,
                </p>
              </div>

              <div className={Style.card + ' b-dark-white'}>
                <div className={Style.imageBackground}>
                  <img src={CashAtDelivery} className={Style.card_icon} />
                </div>
                <p className={Style.card_title + ' bold'}>Pay On Delivery</p>
                <p className={Style.card_description}>
                  Lorem ipsum dolor sit amet, laudem tamquam ullamcorper at pri,
                  partem libris mea id. Vix no odio quas probo,
                </p>
              </div>
            </div>
            <div className={Style.benifits}>
              <p className={Style.number + ' bold'}>.01</p>
              <img src={benifitsPic} alt='' />
              <div className={Style.info}>
                <p className='title purple bold'>Benifits</p>
                <p className={Style.description}>
                  Lorem ipsum dolor sit amet, laudem tamquam ullamcorper at pri,
                  partem libris mea id. Vix no odio quas probo, pri consetetur
                  percipitur id. Semper molestiae consectetuer pri ea, ea est
                  facer nostrud vivendo. Usu cu dicam euripidis complectitur,
                  vis everti erroribus ex. Ad vim minim nobis hendrerit, et
                  ludus feugiat legimus has.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={Style.testimonials + ' b-dark-white'}>
          <div className={Style.info}>
            <p className={Style.section_detail + ' purple bold'}>
              Testimonials
            </p>
            <h2 className='bolder title'>What Clients Say</h2>
          </div>
          <div className={Style.testimonials_cards}>
            <div className={Style.testimo_card + ' b-white'}>
              <p className={Style.review}>
                Lorem ipsum dolor sit amet, laudem tamquam ullamcorper at pri,
                partem libris mea id. Vix no odio quas probo, pri consetetur
                percipitur id. Semper molestiae consectetuer pri ea, ea est
                facer nostrud vivendo. Usu cu dicam euripidis complectitur, vis
                everti erroribus ex. Ad vim minim nobis hendrerit, et ludus
                feugiat legimus has.
              </p>
              <div className={Style.user_info}>
                <img src={user1} alt='' />
                <p className={Style.name + ' bold'}>Mohamed Djemaoui</p>
              </div>
            </div>
            <div className={Style.testimo_card + ' b-purple white'}>
              <p className={Style.review}>
                Lorem ipsum dolor sit amet, laudem tamquam ullamcorper at pri,
                partem libris mea id. Vix no odio quas probo, pri consetetur
                percipitur id. Semper molestiae consectetuer pri ea, ea est
                facer nostrud vivendo. Usu cu dicam euripidis complectitur, vis
                everti erroribus ex. Ad vim minim nobis hendrerit, et ludus
                feugiat legimus has.
              </p>
              <div className={Style.user_info}>
                <img src={user2} alt='' />
                <p className={Style.name + ' bold'}>Djamila Kias</p>
              </div>
            </div>
            <div className={Style.testimo_card + ' b-white'}>
              <p className={Style.review}>
                Lorem ipsum dolor sit amet, laudem tamquam ullamcorper at pri,
                partem libris mea id. Vix no odio quas probo, pri consetetur
                percipitur id. Semper molestiae consectetuer pri ea, ea est
                facer nostrud vivendo. Usu cu dicam euripidis complectitur, vis
                everti erroribus ex. Ad vim minim nobis hendrerit, et ludus
                feugiat legimus has.
              </p>
              <div className={Style.user_info}>
                <img src={user3} alt='' />
                <p className={Style.name + ' bold'}>Kader Ben M&apos;hamed</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
