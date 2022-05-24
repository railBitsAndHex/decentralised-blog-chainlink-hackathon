import React, { useState, useEffect } from "react";
import "../styles/profileInfoGrid.modules.css";
import { Table } from "rsuite";
import { useParams } from "react-router-dom";
import { bpTableData } from "../helper/blogsPostedCreate";
function BlogPostInfo() {
  const { uid } = useParams();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const getData = async (uid: string) => {
      const data: any = await bpTableData(uid);
      setTableData(data);
    };
    if (uid !== undefined) getData(uid);
  }, [uid]);
  return (
    <>
      <section className="blogpost-info-sect">
        <div className="blogpost-info-title">Blogs Posted</div>
        <div>
          {tableData && (
            <Table fillHeight={true} data={tableData}>
              <Table.Column flexGrow={1} align="center">
                <Table.HeaderCell>
                  <span>Title</span>
                </Table.HeaderCell>
                <Table.Cell dataKey="title" />
              </Table.Column>
              <Table.Column flexGrow={1} align="center">
                <Table.HeaderCell>
                  <span>Posted On</span>
                </Table.HeaderCell>
                <Table.Cell dataKey="dateCreated" />
              </Table.Column>
            </Table>
          )}
        </div>
      </section>
    </>
  );
}

export default BlogPostInfo;
