import { Button, Space, Table, Tag } from "antd";
import { bookingApi } from "../../../../redux/features/Booking/bookingApi";

const AdminManageBooking = () => {
  const { data: allBookings } = bookingApi.useGetAllBookingsQuery(undefined);
  const allBookingData = allBookings?.data;

  const tableData = allBookingData?.map((item) => ({
    key: item._id,
    userName: item?.user?.name,
    userEmail: item?.user?.email,
    name: item?.car.name,
    price: item?.car.pricePerHour,
    pickUpDate: item?.pickUpDate,
    pickUpTime: item?.pickUpTime,
    dropOffDate: item?.dropOffDate,
    dropOffTime: item?.dropOffTime,
    status: item?.status,
  }));

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Car Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Pick-Up Date",
      dataIndex: "pickUpDate",
      key: "pickUpDate",
    },
    {
      title: "Pick-Up Time",
      dataIndex: "pickUpTime",
      key: "pickUpTime",
    },
    {
      title: "Drop-Off Date",
      dataIndex: "dropOffDate",
      key: "dropOffDate",
    },
    {
      title: "Drop-Off Time",
      dataIndex: "dropOffTime",
      key: "dropOffTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          className={`status ${
            status === "completed" ? "text-green-500" : "text-yellow-500"
          }`}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <Button>Approve</Button>
          <Button>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="bg-gradient-to-r from-slate-500  p-8 mb-10 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-center text-white">
          Manage All <span className="text-yellow-300">User Bookings</span>
        </h2>
      </div>
      <Table
        columns={columns}
        dataSource={tableData || []}
        pagination={false}
        className="overflow-x-auto"
      />
    </div>
  );
};

export default AdminManageBooking;
