import { Container, Row, Col, Card, Button, Pagination, Form, InputGroup, FormControl } from "react-bootstrap"
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import styles from "../../styles/product-list.module.scss"
import mask from "../../public/images/Mask.png"
import {GoTriangleDown} from "react-icons/go"
import products from "../../public/images/product.png"
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../../redux/actions/color";
import { getProduct, getProductSearch } from "../../redux/actions/productList"
import { getSize } from "../../redux/actions/size";
import { useRouter } from "next/router";
import { Checkbox } from "@material-ui/core";
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import empty from "../../public/images/empty-input-image.png"
import SizeCard from "../../components/SizeCard";
import NumberFormat from "react-number-format";
import Layout from "../../components/Layout";
import {BsSearch} from 'react-icons/bs'
import qs from 'qs'
import { getCategoryTotal } from "../../redux/actions/category";

const ProductListSearch = () => {
    const {color, product, size, category} = useSelector(state=>state)
    const [value, setValue] =  React.useState([0,1000000]);
    const dispatch = useDispatch()
    const router = useRouter()
    const [sizeValue, setSizeValue] = useState([])

    useEffect(()=>{
        dispatch(getColors)
    },[dispatch])

    useEffect(()=>{
        const data = router.query
        console.log(data)
        const queryString = qs.stringify(data)
        console.log(queryString)
        dispatch(getProductSearch(queryString))
    },[router])

    useEffect(()=>{
        dispatch(getSize)
    },[dispatch])

    useEffect(() => {
        dispatch(getCategoryTotal);
    }, [])


    const rangeSelector = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)
      };

    // const sortPrice = async (event) => {
    //     event.preventDefault();
    //     const url = () => `/product?search=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    //     let name = document.getElementById('name').value;
    //     let minPrice = value[0];
    //     let maxPrice = value[1];
    // }

    const handleSizeValueChange = (e) => {
        const elementValue = e.target.previousElementSibling.value
        const tempArray = sizeValue
        if (elementValue) {
            if (sizeValue.indexOf(elementValue) >= 0) {
                tempArray.splice(sizeValue.indexOf(elementValue), 1)
                setSizeValue(tempArray)
            } else {
                setSizeValue([...sizeValue, elementValue])
            }
        }
    }

    const productDetail = (id) => {
        router.push(`./${[id]}`)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const searchData = {}
        searchData.search = e.target.elements['search'].value
        const queryString = qs.stringify(searchData)

        router.push(`/product-list/search?${queryString}`)
        
    }

    return (
        <Layout>
            <Head>
            <title>The King | Product List</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container className="mb-4 bg-dark">
                <form onSubmit={handleSearch}>
                    <InputGroup className="p-3">
                        <FormControl
                        placeholder="Search Product Name"
                        name="search"
                        type="text"
                        />          
                        <Button type='submit'><BsSearch color="white" /></Button>      
                    </InputGroup>
                </form>
            </Container>
            <div className={`${styles.containers} `}>
                <div className={`${styles.profiles} `}>
                    <div className="d-flex flex-column justify-content-center">
                        <div style={{fontSize:"16px", fontFamily:"Rubik"}} className="text-justify p-auto px-5 mx-5 mt-5 nav-text">
                            <span >Shop {""}</span><span className="text-yellow-800"> {">"} Shop Right Sidebar</span>
                        </div>
                        <div className={`${styles.content} text-center mb-2 mt-3`}>Let’s Shopping</div>
                        <div className={`${styles.contents} text-center mb-5`}>Find and buy the one you like</div>
                    </div>
                </div>
                <Row className={`${styles.filter} px-5`}>
                    <Col xl={3} className='px-5 mt-5 pt-3'>
                        <h3>Categories</h3>
                        <div className="mt-5">
                        {category.data.map((data)=>{
                            return (
                                <div key={data.id} className="d-flex flex-row justify-content-between">
                                    <div>{data.name}</div>
                                    <div>{data.count}</div>
                                </div>
                            )
                        })}
                        </div>
                        <Form>
                        <div style={{
                            margin: 'auto',
                            display: 'block',
                            width: "100%"
                        }}>
                            <h3 className="mt-5">Price</h3>
                            <Typography className="mt-4" id="range-slider" gutterBottom>Price <NumberFormat value={value[0]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp. '} ></NumberFormat> - <NumberFormat value={value[1]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp. '} ></NumberFormat></Typography>
                            <Slider
                                value={value}
                                onChange={rangeSelector}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000000}
                                aria-labelledby="range-slider"
                            />
                        </div>
                        <Button type="submit" className={`${styles.button} d-flex py-2`}>
                            Filter
                        </Button>
                        </Form>
                        <h3 className="mt-5">Brands</h3>
                        <div className=" mb-5">
                            <div >
                                <label className="radio-button d-flex  align-items-center">
                                    <input type="checkbox" name="gender"/>
                                    <div className="checkmark px-2"></div>
                                    <div className="text">IKEA</div>
                                 </label>
                            </div>
                            <div>
                                <label className="radio-button d-flex  align-items-center">
                                    <input type="checkbox" name="gender"/>
                                    <div className="checkmark px-2"></div>
                                    <div className="text">Mr Royal</div>
                                </label>
                            </div>
                            <div>
                                <label className="radio-button d-flex  align-items-center">
                                    <input type="checkbox" name="gender"/>
                                    <div className="checkmark px-2"></div>
                                    <div className="text">Sweet House</div>
                                </label>
                            </div>
                            <div>
                                <label className="radio-button d-flex  align-items-center">
                                    <input type="checkbox" name="gender"/>
                                    <div className="checkmark px-2"></div>
                                    <div className="text">North Oxford</div>
                                </label>
                            </div>
                            <div>
                                <label className="radio-button d-flex  align-items-center">
                                    <input type="checkbox" name="gender"/>
                                    <div className="checkmark px-2"></div>
                                    <div className="text">Mr. Poppin 1929</div>
                                </label>
                            </div>
                        </div>
                        <h3 className="mt-5">Colors</h3>
                        {color.data && <Row >
                        {color.data.map((data, idx)=>{
                            return(
                                <Col md={3} key={data.id} style={{cursor: 'pointer'}}>
                                    <div className="d-flex justify-content-between align-items-center py-2">
                                        <div><Checkbox style={{backgroundColor: data.name}} size="small" icon={<CircleUnchecked /> } checkedIcon={<CircleCheckedFilled />}/></div>                                        
                                    </div>                            
                                </Col>
                            )
                        })}
                        </Row>}
                        <h3 className="mt-5">Size</h3>
                        {size.data && <Row className="mt-2">
                            {size.data.map((datas,  idx)=>{
                                return(
                                    <Col md={3} key={datas.id} style={{cursor: 'pointer'}} onClick={(e) => handleSizeValueChange(e)}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <SizeCard className={`${sizeValue.includes(String(datas.id)) ? 'btn-pallet-1 text-pallet-4' : 'btn-outline-pallet-1'} `} radioName={datas.label} value={datas.id} />
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>}
                        <div className="mt-5 mb-5 position-relative">
                            <Image src={mask} width={260} height={280} alt="ShopNow" />
                            <Button className={`${styles.button} bottom-0 start-0 position-absolute mx-4 my-4`}>Shop Now</Button>
                        </div>
                    </Col>
                    <Col xl={9} className='px-5 mt-5 pt-3'>
                        <div className="d-flex justify-content-between">
                            <div>Showing 1-16 of 39 Results</div>
                            <div className="me-5">Sort by <GoTriangleDown /></div>
                        </div>
                        {product.data &&
                        <Row className="mt-5">
                            {product.data.map((datas, idx)=>{
                                return (
                                    <Col xl={4} key={datas.id} style={{cursor: 'pointer'}} onClick={()=>productDetail(datas.id)}>
                                        <Image src={datas.product_images[0]?.image ? datas.product_images[0]?.image : empty} width={293} height={400} alt='products' layout="fixed" />
                                        <div className="text-center">{datas.name}</div>
                                        <div className="text-center"><NumberFormat value={datas?.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp. '} ></NumberFormat></div>
                                    </Col>
                                )
                            })}                            
                        </Row>}
                        <div className="d-flex flex-column align-items-center mt-5 mb-5">
                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />

                            <Pagination.Item>{4}</Pagination.Item>
                            <Pagination.Item>{5}</Pagination.Item>
                            <Pagination.Item >{6}</Pagination.Item>
                            <Pagination.Item>{7}</Pagination.Item>
                            <Pagination.Item >{8}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default ProductListSearch