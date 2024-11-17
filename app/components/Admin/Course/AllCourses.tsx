import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format, register } from "timeago.js";
import vi from "timeago.js/lib/lang/vi";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";
import Link from "next/link";

register("vi", vi);

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Khóa học", flex: 1 },
    { field: "ratings", headerName: "Đánh giá", flex: 0.5 },
    { field: "purchased", headerName: "Người đăng ký", flex: 0.5 },
    { field: "created_at", headerName: "Ngày tạo", flex: 0.5 },
    {
      field: "  ",
      headerName: "Sửa",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <Link href={`/admin/edit-course/${params.row.id}`}>
                <FiEdit2 className="text-black dark:text-white" size={20} />
              </Link>
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Xóa",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}
            >
              <AiOutlineDelete className="text-black dark:text-white" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: format(item.createdAt, "vi"),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Xóa khóa học thành công!");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              // "& .MuiDataGrid-sortIcon": {
              //   color: theme === "dark" ? "#fff" : "#000",
              // },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              // "& .MuiDataGrid-columnHeaders": {
              //   backgroundColor: theme === "dark" ? "#000" : "#A4A9FC",
              //   borderBottom: "none",
              //   color: theme === "dark" ? "#fff" : "#000",
              // },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} pageSizeOptions={[12]} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute left-[50%] top-[50%] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-[8px] bg-white p-4 shadow outline-none dark:bg-slate-900">
                <h1 className={`${styles.title}`}>Bạn có chắc chắn muốn xóa?</h1>
                <div className="mb-6 mt-4 flex w-full items-center justify-between gap-4">
                  <div
                    className={`${styles.button} border bg-white text-black`}
                    onClick={() => setOpen(!open)}
                  >
                    Hủy
                  </div>
                  <div className={`${styles.button} bg-[#d63f3f]`} onClick={handleDelete}>
                    Chắc chắn
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
