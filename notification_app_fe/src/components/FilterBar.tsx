import { Box, ToggleButton, ToggleButtonGroup, FormControl,
  InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
  type: string;
  onTypeChange: (t: string) => void;
  topN?: number;
  onTopNChange?: (n: number) => void;
}
export default function FilterBar({ type, onTypeChange, topN, onTopNChange }: Props) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3, alignItems: "center" }}>
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={(_, val) => onTypeChange(val ?? "")}
        size="small"
      >
        <ToggleButton value="">All</ToggleButton>
        <ToggleButton value="Placement">Placement</ToggleButton>
        <ToggleButton value="Result">Result</ToggleButton>
        <ToggleButton value="Event">Event</ToggleButton>
      </ToggleButtonGroup>

      {onTopNChange && (
        <FormControl size="small" sx={{ minWidth: 110 }}>
          <InputLabel>Show top</InputLabel>
          <Select
            value={topN}
            label="Show top"
            onChange={(e) => onTopNChange(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      )}
    </Box>
  );
}