import Head from "next/head";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MercariIcon } from "@/components/MercariIcon";
import { RakumaIcon } from "@/components/RakumaIcon";
import { Container } from "@mui/system";
import { useState } from "react";
import { Service } from "@/utils";
import { ShippingTable } from "@/components/ShippingTable";

const TITLE = "メルカリラクマ 配送料比較表";
export type ServiceOption = Service | "none";

export default function Home() {
  const [service, setService] = useState<ServiceOption>("none");
  const [g, setG] = useState(0);
  const [height, setHeight] = useState(0);

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
      <Container maxWidth="xl" sx={{ px: 0 }}>
        <Stack spacing={2}>
          <Typography
            variant="h3"
            component="h1"
            textAlign="center"
            sx={{
              wordBreak: "keep-all",
            }}
          >
            メルカリラクマ
            <wbr />
            配送料比較表
          </Typography>
          <Typography variant="h5" component="h2">
            フィルター
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="space-around">
            <FormControl fullWidth>
              <FormLabel>サービス</FormLabel>
              <RadioGroup
                row
                defaultValue="none"
                onChange={(e) => setService(e.target.value as ServiceOption)}
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
              label="厚さ"
              type="number"
              fullWidth
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
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
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
              }}
            />
          </Stack>
          <Box>
            <ShippingTable g={g} height={height} service={service} />
          </Box>
        </Stack>
      </Container>
    </>
  );
}
