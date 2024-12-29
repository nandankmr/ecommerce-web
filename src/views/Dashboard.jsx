import { useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next"
import { useQuery, useQueryClient } from "react-query";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { Edit2, Trash2 } from "react-feather";
import axiosInstance from "../utils/AxiosInstrance";
import Loader from "../layouts/loader/Loader";
import { showAlert } from "../utils/common";
import ConfirmationModal from "../components/ConfirmationModal";

const Dashboard = () => {
  const [orderToBeDeleted, setOrderToBeDeleted] = useState(null);
  const [loader, setLoader] = useState(false);
  const queryClient = useQueryClient();
  const [filterText, setFilterText] = useState("");


  const deleteSelectedOrder = async () => {
    try {
      setLoader(true);
      await axiosInstance.delete(`/api/order/${orderToBeDeleted.id}`);
      showAlert("Order deleted successfully");
      setOrderToBeDeleted(null);
      queryClient.invalidateQueries("orders");
    } catch (error) {
      showAlert(error?.response?.data?.message ?? "Something went wrong", {
        type: "warning",
      });
    } finally {
      setLoader(false);
    }
  }

  const columns = [
    {
      dataField: "id",
      text: "Order ID",
      sort: true,
    },
    {
      dataField: "orderDescription",
      text: "Order Description",
    },
    {
      dataField: "noOfProducts",
      text: "Count of Products",
    },
    {
      dataField: "createdAt",
      text: "Created Date",
      sort: true,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: (cell, row) => {
        return (
          <div className="d-flex gap-2">
            {/* Edit Order */}
            <Link to={`/edit-order/${row.id}`}>
              <Button color="primary" title="Edit Order"><Edit2 /></Button>
            </Link>
            {/* delete order */}
            <Button color="danger" title="Delete Order" onClick={() => {
              setOrderToBeDeleted(row);
            }}><Trash2 /></Button>
          </div>
        )
      },
    },
  ];

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(`/api/order`);
      return response.data.orders;
    } catch (error) {
      console.error(error);
    }
  }

  const { data, isLoading } = useQuery("orders", fetchOrders,
    {
      refetchOnMount: false,
      suspense: false,
    }
  );

  const filteredData = useMemo(() => {
    if (!filterText) return data;
    return data.filter((order) => {
      return order.orderDescription.toLowerCase().includes(filterText.toLowerCase()) ||
        order.id.toString().includes(filterText.toString());
    });
  }, [data, filterText]);

  if (isLoading) return <Loader />;

  return (
    <div
      className="w-100 d-flex flex-column"
    >
      <h1>Order Management</h1>
      <div className="d-flex justify-content-end pb-2">
        <Input className="w-50" placeholder="Search by Order Description or Order ID"
          onChange={(e) => setFilterText(e.target.value)} />
      </div>
      <BootstrapTable
        keyField="id"
        data={filteredData}
        columns={columns}
        noDataIndication="No orders found"
      />
      <div className="d-flex">
        <Link to="/create-order">
          <Button color="primary">New Order</Button>
        </Link>
      </div>
      {orderToBeDeleted ? (
        <ConfirmationModal isOpen={!!orderToBeDeleted} yes={deleteSelectedOrder} no={() => setOrderToBeDeleted(null)} loader={loader} />
      ) : null}
    </div>
  )
}

export default Dashboard