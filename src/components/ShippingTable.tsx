import { shippings } from "@/shippings";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MercariIcon } from "./MercariIcon";
import { RakumaIcon } from "./RakumaIcon";
import { ServiceOption } from "@/pages";

export function ShippingTable(props: {
  service: ServiceOption;
  height: number;
  g: number;
}) {
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <TableContainer component={Paper} sx={{ overflowX: "scroll" }}>
      <Table size={isWideScreen ? "medium" : "small"}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>配送種類</Typography>
            </TableCell>
            <TableCell>
              <Typography>梱包サイズ</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ wordBreak: "keep-all" }}>
                厚さ
                <wbr />
                制限
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ wordBreak: "keep-all" }}>
                重量
                <wbr />
                制限
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>送料</Typography>
            </TableCell>
            <TableCell>
              <Typography>匿名?</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shippings
            .filter((shipping) => {
              const pass_service =
                props.service === "none" || shipping.available[props.service];
              const pass_height =
                Number.isNaN(props.height) ||
                shipping.maxHeight >= props.height;
              const pass_g = Number.isNaN(props.g) || shipping.g >= props.g;
              return pass_service && pass_height && pass_g;
            })
            .map(
              ({
                available,
                name,
                maxHeight,
                size,
                g,
                cost,
                isAnonymous,
                id,
              }) => (
                <TableRow key={id}>
                  <TableCell>
                    <Box alignContent="center" display="flex" flexWrap="wrap">
                      <MercariIcon valid={available.mercari} />
                      <RakumaIcon valid={available.rakuma} />
                      <Typography sx={{ wordBreak: "keep-all" }}>
                        {name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ wordBreak: "keep-all" }}>
                      {size}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      textAlign="right"
                      sx={{ wordBreak: "keep-all" }}
                    >
                      {maxHeight}cm
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      textAlign="right"
                      sx={{ wordBreak: "keep-all" }}
                    >
                      {g >= 1000 ? `${g / 1000}kg` : `${g}g`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      textAlign="right"
                      sx={{ wordBreak: "keep-all" }}
                    >
                      {cost}円
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ wordBreak: "keep-all" }}>
                      {isAnonymous ? "匿名" : "記名"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ),
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
