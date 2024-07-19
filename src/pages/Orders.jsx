import React , {useState,useEffect}  from 'react'
import {getAllOrders , getProductDetails} from './../api/index.js'

const productMap = {} ;

function Orders ({digitalData,currentUser}) {
    const [orders,setOrders] = useState([]) ;

    const getOrderDetails = async () => {
        const token = localStorage.getItem("krist-app-token");
        // console.log(token);
        if(token){
            // console.log("token fro order" , token);
            await getAllOrders(token).then((res)=>{
                setOrders(res.data) ;
            })
        }
    }

    function setDigitalData() {
        // console.log("digital Data called");
        try {
          digitalData.page = {
            pageUrl: window.location.href,
            title: document.title,
          };
          digitalData.product = {};
          if (currentUser) {
            digitalData.user = {
              userDetails: {
                userId: currentUser._id,
              },
              loggedIn: true,
            };
          } else {
            digitalData.user = {
              userDetails: null,
              loggedIn: false,
            };
          }
    
          // console.log(digitalData);
        } catch (e) {
          console.error(e);
        }
      }


    useEffect(()=>{
        getOrderDetails();
        setDigitalData();
    },[]);

    return (
        <div className=" min-h-screen mb-10 ">
            <div className="my-10 text-center font-bold text-2xl">Past Orders</div>

            { orders?.length ===0 ? <div className='my-10 text-center' >No Order Yet</div> 
            
            : <>

            { orders?.map((order , index) => (
                <>
                <div key={index} className="container mx-auto max-w-[90%] mt-10 rounded-md ">
                    <div className="bg-white shadow-md rounded my-6">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Product ID</th>
                            {/* <th className="py-3 px-6 text-left">Price</th> */}
                            <th className="py-3 px-6 text-left">Quantity</th>
                            <th className="py-3 px-6 text-left">Date Of Purches</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {order?.products?.map((item, index) => (
                                 <tr key={item?.product.id} className="border-b border-gray-200 hover:bg-gray-100">
                                 <td className="py-3 px-6 text-left">
                                       <div className="font-bold cursor-pointer hover:text-blue-700 " onClick={()=> window.location.replace(`/product/${item.product}`)}>{item.product}</div>
                                 </td>
                                 <td className="py-3 px-12 text-left">{item?.quantity}</td>
                                 
                                 <td className="pt-3 px-6 text-left">{order?.createdAt}</td>
                               </tr>
                            ))}
                        </tbody>

                    </table>
                    </div>
                </div>

                <div className='text-right mr-72 font-bold text-gray-500 text-xl'>Total Amount - {order?.total_amount["$numberDecimal"]
                }</div>

                </>
            ))}

</>}

        </div>
    )
}

export default Orders ;