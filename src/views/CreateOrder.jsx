import { useQuery } from "react-query";
import { useFormik } from "formik";
import { Button, Form, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstrance";
import Loader from "../layouts/loader/Loader";
import { showAlert } from "../utils/common";
import { useState } from "react";

const Dashboard = () => {
    const params = useParams();
    const editId = params.id;
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const fetchOrderData = async () => {
        try {
            let orderData = {
                orderDescription: "",
                selectedProducts: [],
            }
            if (editId) {
                const response = await axiosInstance.get(`/api/order/${editId}`);
                orderData = {
                    orderDescription: response.data.orderDescription,
                    selectedProducts: response.data.products.map(product => product.productId),
                }
            }
            const response = await axiosInstance.get(`/api/products`);
            return { products: response.data.products, orderData };
        } catch (error) {
            showAlert(error?.response?.data?.message ?? "Something went wrong", {
                type: "warning",
            });
        }
    };
    const { data: { products, orderData }, isLoading }
        = useQuery(
            "products",
            fetchOrderData,
            {
                refetchOnMount: false,
            }
        );

    const saveOrder = async (values) => {
        try {
            setLoader(true);
            if (editId) {
                await axiosInstance.put(`/api/order/${editId}`, {
                    orderDescription: values.orderDescription,
                    products: values.selectedProducts,
                });
                showAlert("Order updated successfully");
            } else {
                await axiosInstance.post(`/api/order`, {
                    orderDescription: values.orderDescription,
                    products: values.selectedProducts,
                });
                showAlert("Order created successfully");
            }
            navigate("/dashboard");
        } catch (error) {
            showAlert(error?.response?.data?.message ?? "Something went wrong", {
                type: "warning",
            });
            console.error(error);
        } finally {
            setLoader(false);
        }
    }

    const formik = useFormik({
        initialValues: orderData,
        validationSchema: Yup.object({
            orderDescription: Yup.string().required("Description is required"),
            selectedProducts: Yup.array().required("Select at least one product").min(1, "Select at least one product"),
        }),
        onSubmit: saveOrder,
    });


    if (isLoading) return <Loader />;

    return (
        <div className="w-100 d-flex flex-column">
            {editId ? <h1>Edit Order</h1> : <h1>New Order</h1>}

            <Form onSubmit={formik.handleSubmit}>
                <div>
                    <Label>Order Description</Label>
                    <Input
                        type="text"
                        name="orderDescription"
                        value={formik.values.orderDescription}
                        onChange={formik.handleChange}
                        invalid={formik.touched.orderDescription && !!formik.errors.orderDescription}
                        onBlur={formik.handleBlur}
                        placeholder="Enter order description"
                    />
                    <FormFeedback>{formik.errors.orderDescription}</FormFeedback>
                </div>
                <div>
                    <Label>Select Products</Label>
                    <div
                        className={`${formik.touched.selectedProducts
                            && formik.errors.selectedProducts ? 'is-invalid' : ''} d-flex flex-column gap-2`}
                    >
                        {
                            products.map((product) => (
                                <div key={product.id} onClick={() => {
                                    if (formik.values.selectedProducts.includes(product.id)) {
                                        formik.setFieldValue("selectedProducts",
                                            formik.values.selectedProducts.filter(id => id !== product.id))
                                    } else {
                                        formik.setFieldValue("selectedProducts", [...formik.values.selectedProducts, product.id])
                                    }
                                }} className="d-flex gap-2 cursor-pointer bg-white rounded-3 p-2">
                                    <Input
                                        type="checkbox"
                                        name={`selectedProducts[${product.id}]`}
                                        value={product.id}
                                        checked={formik.values.selectedProducts.includes(product.id)}
                                        onChange={() => { }}
                                    />
                                    <div className="d-flex flex-column">
                                        <h5>{product.productName}</h5>
                                        <p className="mb-0">{product.productDescription}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <FormFeedback>{formik.errors.selectedProducts}</FormFeedback>
                </div>
                <div className="d-flex justify-content-between">
                    <Button color="secondary" onClick={() => navigate("/dashboard")}>Cancel</Button>
                    <Button type="submit" color="primary" disabled={loader}>Submit</Button>
                </div>
            </Form>
        </div>
    )
}

export default Dashboard