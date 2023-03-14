import Head from 'next/head';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
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
} from '@mui/material';
import { MercariIcon } from '@/components/MercariIcon';
import { RakumaIcon } from '@/components/RakumaIcon';
import { shippings } from '@/shippings';
import { Container } from '@mui/system';
import { useCallback, useMemo, useState } from 'react';

const TITLE = 'メルカリラクマ 配送料比較表';

export default function Home() {
  const [selectedMercariShipping, setSelectedMercariShipping] = useState<
    number | undefined
  >(undefined);
  const [selectedRakumaShipping, setSelectedRakumaShipping] = useState<
    number | undefined
  >(undefined);
  const [service, setService] = useState('none');
  const [g, setG] = useState(0);
  const [height, setHeight] = useState(0);
  const [filteredShippings, setFilteredShippings] = useState(shippings);
  const filter = () =>
    setFilteredShippings(
      shippings.filter((shipping) => {
        const pass_service =
          service === 'none' ||
          (service === 'mercari' && shipping.available.mercari) ||
          (service === 'rakuma' && shipping.available.rakuma);
        const pass_height =
          Number.isNaN(height) || shipping.maxHeight >= height;
        const pass_g = Number.isNaN(g) || shipping.g >= g;
        return pass_service && pass_height && pass_g;
      })
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
              <TableCell>
                <MercariIcon />
              </TableCell>
              <TableCell>
                <RakumaIcon />
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
                    <Typography>{isAnonymous ? '匿名' : '記名'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Radio
                      checked={selectedMercariShipping === id}
                      onChange={() => setSelectedMercariShipping(id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Radio
                      checked={selectedRakumaShipping === id}
                      onChange={() => setSelectedRakumaShipping(id)}
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    ),
    [filteredShippings, selectedMercariShipping, selectedRakumaShipping]
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
                  setService(e.target.value);
                  filter();
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
              onBlur={filter}
            />
            <TextField
              label="重さ"
              placeholder="g単位"
              type="number"
              fullWidth
              value={g}
              onChange={(e) => setG(Number(e.target.value))}
              onBlur={filter}
            />
          </Stack>
          <Box>{renderTable}</Box>
        </Stack>
      </Container>
    </>
  );
}
