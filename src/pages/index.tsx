import Head from "next/head";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { MercariIcon } from "@/components/MercariIcon";
import { RakumaIcon } from "@/components/RakumaIcon";
import { shippings } from "@/shippings";
import { Container } from "@mui/system";
import { useMemo, useState } from "react";
import { Service } from "@/utils";

const TITLE = "メルカリラクマ 配送料比較表";
type ServiceOption = Service | "none";

export default function Home() {
  const [service, setService] = useState<ServiceOption>("none");
  const [g, setG] = useState(0);
  const [height, setHeight] = useState(0);
  const [filteredShippings, setFilteredShippings] = useState(shippings);
  const filter = (service: ServiceOption) =>
    setFilteredShippings(
      shippings.filter((shipping) => {
        const pass_service = service === "none" || shipping.available[service];
        const pass_height =
          Number.isNaN(height) || shipping.maxHeight >= height;
        const pass_g = Number.isNaN(g) || shipping.g >= g;
        return pass_service && pass_height && pass_g;
      }),
    );
  const renderTable = useMemo(
    () => (
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
                  高さ <br /> 制限
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
            {filteredShippings.map(
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
    ),
    [filteredShippings],
  );
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="widTableCell=device-widTableCell, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl">
        <Stack spacing={2}>
          <Typography variant="h2" textAlign="center">
            {TITLE}
          </Typography>
          <Typography variant="h4">フィルター</Typography>
          <Stack direction="row" spacing={2} justifyContent="space-around">
            <FormControl fullWidth>
              <FormLabel>サービス</FormLabel>
              <RadioGroup
                row
                defaultValue="none"
                onChange={(e) => {
                  const service = e.target.value as ServiceOption;
                  setService(service);
                  filter(service);
                }}
              >
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="未選択"
                />
                <FormControlLabel
                  value="mercari"
                  control={<Radio />}
                  label={<MercariIcon valid />}
                />
                <FormControlLabel
                  value="rakuma"
                  control={<Radio />}
                  label={<RakumaIcon valid />}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              label="高さ"
              type="number"
              fullWidth
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              onBlur={() => filter(service)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              }}
            />
            <TextField
              label="重さ"
              type="number"
              fullWidth
              value={g}
              onChange={(e) => setG(Number(e.target.value))}
              onBlur={() => filter(service)}
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
              }}
            />
          </Stack>
          <Box>{renderTable}</Box>
        </Stack>
      </Container>
    </>
  );
}
