import { shippings } from "@/shippings";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, Box } from "@mui/material";
import { MercariIcon } from "./MercariIcon";
import { RakumaIcon } from "./RakumaIcon";
import { ServiceOption } from "@/pages";

export function ShippingTable(props: {
  service: ServiceOption;
  height: number;
  g: number;
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>配送種類</Typography>
            </TableCell>
            <TableCell>
              <Typography>梱包サイズ</Typography>
            </TableCell>
            <TableCell>
              <Typography>
                厚さ <br /> 制限
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                重量 <br /> 制限
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
                    <Box
                      flexDirection="row"
                      alignContent="center"
                      display="flex"
                    >
                      <MercariIcon valid={available.mercari} />
                      <RakumaIcon valid={available.rakuma} />
                      <Typography>{name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography>{size}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography textAlign="right">{maxHeight} cm</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography textAlign="right">
                      {g >= 1000 ? `${g / 1000} kg` : `${g} g`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography textAlign="right">{cost} 円</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{isAnonymous ? "匿名" : "記名"}</Typography>
                  </TableCell>
                </TableRow>
              ),
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
