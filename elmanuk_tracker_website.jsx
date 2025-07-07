import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ElmanukTracker() {
  const [weightLog, setWeightLog] = useState([]);
  const [newWeight, setNewWeight] = useState("");
  const [date, setDate] = useState("");

  const addWeight = () => {
    if (!date || !newWeight) return;
    setWeightLog([...weightLog, { date, weight: parseFloat(newWeight) }]);
    setNewWeight("");
    setDate("");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Elmanuk Tracker</h1>
      <Card className="mb-4">
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Tanggal"
          />
          <Input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="Berat Badan (kg)"
          />
          <Button onClick={addWeight}>Tambah</Button>
        </CardContent>
      </Card>

      {weightLog.length > 0 && (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightLog}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Checklist Harian</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>✅ Sarapan sebelum jam 07.00</li>
          <li>✅ Snack sehat saat istirahat sekolah</li>
          <li>✅ Makan siang dari bekal sehat</li>
          <li>✅ Workout sore (jika jadwalnya ada)</li>
          <li>✅ Minum air putih 2-3 liter</li>
          <li>✅ Tidur cukup 7 jam</li>
        </ul>
      </div>
    </div>
  );
}
