import React, { useEffect } from 'react';
import { FaBars, FaFacebook, FaGithub, FaLinkedin, FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { RootState } from './ducks';
import { localeActions } from './ducks/locale';
import { routerActions } from './ducks/router';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state.locale);
  const router = useSelector((state: RootState) => state.router);

  useEffect(() => {
    dispatch(localeActions.start());
    dispatch(routerActions.start());
    dispatch(routerActions.push('/'));
  }, [dispatch]);

  const spring = useSpring({ opacity: 1, number: 2020, from: { opacity: 0, number: 0 } });

  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-100">
      <header className="px-4 py-4 flex justify-between bg-gray-900 fixed w-full top-0 z-10 text-white shadow-md">
        <div className="font-extrabold flex align-middle">
          <FaRegBookmark className="text-xl text-blue-600" />{' '}
          <span className="ml-1">Hansel De La Cruz</span>
        </div>
        <div className="font-bold text-lg sm:text-sm">
          <ul className="flex sm:hidden">
            <li>
              <button className="rounded p-1 hover:bg-gray-700">
                <FaBars />
              </button>
            </li>
          </ul>
          <ul className="hidden sm:flex">
            <li>Résumé</li>
            <li className="ml-2">Projects</li>
          </ul>
        </div>
      </header>
      <animated.main className="container flex-1 mt-20 px-6 break-all" style={spring}>
        <p className="sm:hidden text-red-700 text-center">XS</p>
        <p className="hidden sm:block md:hidden text-blue-700 text-center">SM</p>
        <p className="hidden md:block lg:hidden text-green-700 text-center">MD</p>
        <p className="hidden lg:block xl:hidden text-yellow-700 text-center">LG</p>
        <p className="hidden xl:block text-purple-500 text-center">XL</p>
        <p>{JSON.stringify(locale)}</p>
        <p>{JSON.stringify(router)}</p>
        <animated.span>{spring.number.interpolate(val => Math.floor(val))}</animated.span>
        <p>
          Ipsum deserunt nisi eligendi nihil impedit. Atque doloremque nostrum minima iusto delectus
          voluptas, velit? Minima amet nobis consequatur beatae quis! Quidem ullam voluptatem nobis
          quasi sequi Reiciendis cumque ducimus sequi perspiciatis quas veniam, nesciunt libero
          Quidem laudantium nihil corporis iste exercitationem Nisi corrupti minus recusandae velit
          eius impedit Neque rerum doloribus debitis atque quos? Odit voluptatum exercitationem
          suscipit at a eius consequuntur! Modi dolorem doloremque odit deserunt laborum Sapiente
          quidem delectus quibusdam numquam vitae. Perferendis molestiae provident ducimus sunt eos
          ex Sunt consequuntur perferendis expedita minus error, perferendis consequuntur? Ad
          doloremque dignissimos soluta aliquid corporis totam Accusantium nulla est unde itaque
          adipisci nihil eveniet? In dolor nobis voluptates expedita enim. Similique sunt quas
          dolore nisi eum sunt Similique incidunt at nulla ex quod. Accusantium fuga at aut aperiam
          maxime, in. Fuga rerum necessitatibus voluptatum debitis recusandae! Libero ea maiores
          dolorem illum exercitationem quas! Animi esse quae nemo praesentium molestiae rem
          Quibusdam magni laborum facilis obcaecati harum Repudiandae quo fuga rem error laudantium
          facere, iusto? Voluptatum rem quae in ullam eaque accusantium. Quibusdam suscipit corrupti
          dolorem vero pariatur, voluptatem quidem Alias dolorem doloremque possimus laborum
          blanditiis eligendi. Ipsum quidem accusantium qui esse provident eveniet! Repellat odit
          doloribus impedit cupiditate doloribus ad porro Autem nostrum ipsa non omnis suscipit
          dolor ab maiores voluptatem quibusdam aspernatur Velit harum omnis sed accusantium unde
          eius dicta Beatae nihil velit aliquid temporibus non aspernatur Architecto quo sit laborum
          minus quasi explicabo deleniti. Alias praesentium numquam provident illum iure! Nulla
          assumenda impedit maiores assumenda molestias eligendi. Optio explicabo laudantium dolor
          totam illo. Magni ipsam iure dignissimos fugiat libero facilis. Dolores numquam officiis
          saepe asperiores ea Labore incidunt qui corrupti quae sunt Perferendis quo culpa amet sint
          fugit? Quisquam dolor sequi voluptas culpa minus. Alias inventore quo voluptatibus ad
          earum. Sapiente sapiente esse eaque voluptate et? Nostrum iure vitae necessitatibus vero
          impedit. Sint culpa cupiditate quas provident recusandae Quisquam ullam totam molestias
          laboriosam nemo. Modi debitis eius fugit facere dolores, vel Adipisci dolorum expedita
          mollitia et similique! Excepturi veniam iste a obcaecati veritatis Dolorem vel iste aut
          dignissimos nam? Pariatur enim voluptatem est soluta tempora recusandae omnis mollitia
          alias omnis alias! Aut commodi ipsam esse tempore aliquam ex? Voluptate exercitationem
          optio adipisci quas pariatur fugit! Voluptates nisi iure asperiores quam rerum facilis
          Repudiandae molestias quasi voluptatem fugiat saepe Facere inventore debitis blanditiis
          cupiditate numquam Doloribus corrupti nihil reprehenderit aliquam nulla enim, labore!
          Neque eos inventore itaque cupiditate rem voluptates. Aspernatur nisi vitae ab placeat
          debitis! Tempore minus numquam tempora quia recusandae? Magnam veritatis vero quam illo
          aliquam. Omnis nobis praesentium vitae sunt adipisci. Harum enim labore amet quia vel
          aperiam Vitae praesentium voluptatem perspiciatis architecto qui! Accusamus eveniet sequi
          mollitia dolore eligendi? Vero earum distinctio assumenda assumenda voluptate odit debitis
          velit? Est doloribus quod expedita iusto quo, fuga ipsa Voluptas perspiciatis atque magnam
          unde deleniti ab quod non? Itaque odit distinctio repudiandae ipsam doloremque. Quaerat
          expedita expedita natus distinctio voluptatem voluptatibus. Vel recusandae voluptatem
          deleniti molestias quam ut nam Blanditiis numquam doloremque velit repellendus aliquid
          dignissimos. Quo sequi
        </p>
        {/* <button>Click me</button> */}
      </animated.main>
      <footer className="bg-gray-900 mt-4 px-4 py-16 text-white">
        <div className="flex justify-between">
          <div className="text-sm font-semibold">
            <ul className="flex">
              <li>About Me</li>
              <li className="ml-2">Contact</li>
            </ul>
          </div>
          <div className="text-lg">
            <ul className="flex">
              <li>
                <FaFacebook />
              </li>
              <li className="ml-3">
                <FaLinkedin />
              </li>
              <li className="ml-3">
                <FaGithub />
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-0 border-gray-800 my-8" />
        <div className="w-full text-xs text-gray-300 text-center">
          <span>&copy; Copyright 2020</span> <span className="font-bold">Hansel De La Cruz</span>
        </div>
      </footer>
      <div
        className="hidden fixed z-50 top-0 left-0 w-full h-full overflow-auto bg-black"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="mt-16 mx-auto p-4 bg-gray-100 rounded w-5/6 text-white">
          <div>
            <h1 className="text-lg font-bold">Header</h1>
          </div>
          <div>Content</div>
          <div>Footer</div>
        </div>
      </div>
    </div>
  );
};

export default App;
