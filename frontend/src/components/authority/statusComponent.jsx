/* eslint-disable react/prop-types */
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { useEffect, useState } from "react";

const RoundedCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: theme.shadows[3],
  minWidth: "150px",
  textAlign: "center",
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  flexGrow: 1,
}));

const AuthorityStatus = () => {
  const [email, setEmail] = useState("");
  const [esimId, setEsimId] = useState("");
  const [total, setTotal] = useState(0);
  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    const storedUserJson = sessionStorage.getItem("user");
    if (storedUserJson) {
      try {
        const storedUser = JSON.parse(storedUserJson);
        const storedEmail = storedUser.useremail;
        if (storedEmail) {
          setEmail(storedEmail);
        }
        console.log("staff id is", storedEmail);
      } catch (error) {
        console.error("Error parsing user JSON from session storage", error);
      }
    }
  }, []);

  const fetchStudentData = async () => {
    const url = `http://localhost:3000/api/v1/getRequestsForStatus/${esimId}`;
    try {
      const response = await axios.get(url);
      const requests = response.data;

      // Initialize counters
      const totalRequests = requests.length;
      let approvedCount = 0;
      let pendingCount = 0;
      let rejectedCount = 0;

      // Loop through the requests to count based on conditions
      requests.forEach((request) => {
        console.log("the request is", request);
        if (request.status === true) {
          approvedCount++;
        } else if (request.status === null) {
          pendingCount++;
        } else if (request.status === false) {
          rejectedCount++;
        }
      });

      // Update state with counts
      setTotal(totalRequests);
      setApproved(approvedCount);
      setPending(pendingCount);
      setRejected(rejectedCount);

      // Output counts for debugging
      console.log(`Total Requests: ${totalRequests}`);
      console.log(`Approved Count: ${approvedCount}`);
      console.log(`Pending Count: ${pendingCount}`);
      console.log(`Rejected Count: ${rejectedCount}`);
    } catch (error) {
      console.error("Error fetching student data", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchEsimIdByEmail(email);
    }
  }, [email]);

  useEffect(() => {
    if (esimId) {
      fetchStudentData();
    }
  }, [esimId]);

  const fetchEsimIdByEmail = async (email) => {
    const url = `http://localhost:3000/api/v1/getStaffId/${email}`;
    console.log("The url is ", url);
    try {
      const response = await axios.get(url);
      console.log("fetchEsimIdByEmail", response);
      setEsimId(response.data.esim_id);
    } catch (error) {
      console.error("Error fetching esim_id", error);
    }
  };

  const chartData = [
    { status: "Total", count: total },
    { status: "Pending", count: pending },
    { status: "Approved", count: approved },
    { status: "Rejected", count: rejected },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} justifyContent="space-evenly">
        <Grid item xs={12} sm={3}>
          <RoundedCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Requests
              </Typography>
              <Typography variant="body1">{total}</Typography>
            </CardContent>
          </RoundedCard>
        </Grid>
        <Grid item xs={12} sm={3}>
          <RoundedCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending
              </Typography>
              <Typography variant="body1">{pending}</Typography>
            </CardContent>
          </RoundedCard>
        </Grid>
        <Grid item xs={12} sm={3}>
          <RoundedCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Approved
              </Typography>
              <Typography variant="body1">{approved}</Typography>
            </CardContent>
          </RoundedCard>
        </Grid>
        <Grid item xs={12} sm={3}>
          <RoundedCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rejected
              </Typography>
              <Typography variant="body1">{rejected}</Typography>
            </CardContent>
          </RoundedCard>
        </Grid>
      </Grid>
      <Box sx={{ height: 500, marginTop: 4 }}>
        <ResponsiveBar
          data={chartData}
          keys={["count"]}
          indexBy="status"
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          padding={0.3}
          colors={({ data }) => {
            switch (data.status) {
              case "Total":
                return "#4caf50";
              case "Pending":
                return "#ffeb3b";
              case "Approved":
                return "#2196f3";
              case "Rejected":
                return "#f44336";
              default:
                return "#645bd6";
            }
          }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Status",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Count",
            legendPosition: "middle",
            legendOffset: -40,
            tickValues: [20, 40, 60, 80, 100, 120, 140],
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </Box>
    </Box>
  );
};

export default AuthorityStatus;
