import React from 'react';
import { FaPhone } from 'react-icons/fa';

/* background: rgb(237,137,54); */
/* background: radial-gradient(circle, rgba(237,137,54,1) 0%, rgba(236,201,75,1) 100%); */

const MaxMofongoApp: React.FC = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-yellow-500 font-montserrat"
      style={{
        background: 'radial-gradient(circle, rgba(236,201,75,1) 0%, rgba(237,137,54,1) 100%'
      }}
    >
      <header className="flex flex-col p-6 text-white bg-gray-900 rounded-br-full shadow-md">
        <span className="text-5xl font-black">Max Mofongo</span>
        <span className="inline-flex items-center ml-10 text-2xl font-bold">
          <FaPhone className="text-lg" />
          <span className="ml-2">978&bull;985&bull;2323</span>
        </span>
        <span className="mt-2 ml-20 text-lg font-bold">¡Hacemos entregas en Lowell solamente!</span>
      </header>
      <main className="container flex-1 w-full px-12 mx-auto mt-16">
        <div className="flex justify-center">
          <div className="w-1/2">
            <h2 className="px-2 text-xl font-bold text-white uppercase bg-gray-900 rounded">
              Mofongo o Tostones de
            </h2>
            <div className="flex justify-between mt-2 font-semibold">
              <p>Camarones en ensalada</p>
              <p>15.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Camarones a la mantequilla</p>
              <p>15.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Camarones en salsa</p>
              <p>15.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Camarones al ajillo</p>
              <p>15.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Pulpo en ensalada</p>
              <p>15.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Pulpo en salsa</p>
              <p>15.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Pulpo al ajillo</p>
              <p>15.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Carrucho en ensalada</p>
              <p>15.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Carrucho en salsa</p>
              <p>15.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Carrucho al ajillo</p>
              <p>15.00</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>King crab</p>
              <p>12.00</p>
            </div>
          </div>
          <div className="w-1/2 ml-4">
            <h2 className="px-2 text-xl font-bold text-white uppercase bg-gray-900 rounded">
              Tostones Rellenos
            </h2>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="w-1/2">
            <h2 className="px-2 text-xl font-bold text-white uppercase bg-gray-900 rounded">
              Chillo Entero
            </h2>
            <div className="flex justify-between mt-2 font-semibold">
              <p>Frito, en salsa o al ajillo</p>
              <p>(según tamaño)</p>
            </div>
          </div>
          <div className="w-1/2 ml-4">
            <h2 className="px-2 text-xl font-bold text-white uppercase bg-gray-900 rounded">
              Vasos Mariscos
            </h2>
          </div>
        </div>
        {/* <div className="flex justify-center"> */}
        {/*   <MenuItem name="Chillo Entero" description="Frito, en salsa o al ajillo" price={15} /> */}
        {/*   <MenuItem name="Camarones a la Mantequilla" description="Ingredientes" price={15} /> */}
        {/* </div> */}
        {/* <div className="flex justify-center"> */}
        {/*   <MenuItem name="Camarones al Ajillo" description="Ingredientes" price={15} /> */}
        {/*   <MenuItem name="Camarones Empanizado" description="Ingredientes" price={15} /> */}
        {/* </div> */}
        {/* <div className="flex justify-center"> */}
        {/*   <MenuItem name="Camarones en Ensalada" description="Ingredientes" price={15} /> */}
        {/*   <MenuItem name="Pulpo en Ensalada" description="Ingredientes" price={15} /> */}
        {/* </div> */}
        {/* <div className="flex justify-center"> */}
        {/*   <MenuItem name="Pulpo en Salsa" description="Ingredientes" price={15} /> */}
        {/*   <MenuItem name="Pulpo al Ajillo" description="Ingredientes" price={15} /> */}
        {/* </div> */}
        {/* <div className="flex justify-center"> */}
        {/*   <MenuItem name="Carrucho en Salsa" description="Ingredientes" price={15} /> */}
        {/*   <MenuItem name="Carrucho al Ajillo" description="Ingredientes" price={15} /> */}
        {/* </div> */}
        {/* <div className="flex justify-center"> */}
        {/*   <MenuItem name="Carrucho en Ensalada" description="Ingredientes" price={15} /> */}
        {/*   <MenuItem name="Mofongo Mixto" description="Ingredientes" price={15} /> */}
        {/* </div> */}
        {/* <div className="flex justify-center"> */}
        {/*   <MenuItem name="Mofongo de King Crab" description="Ingredientes" price={12} /> */}
        {/* </div> */}
      </main>
      <footer className="h-20 p-6 mt-16 text-white bg-gray-900" />
    </div>
  );
};

export default MaxMofongoApp;
