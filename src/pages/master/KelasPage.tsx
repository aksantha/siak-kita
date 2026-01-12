import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable, Column } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';

interface Kelas {
  id: number;
  kode: string;
  nama: string;
  prodi: string;
  tahunMasuk: number;
  semester: number;
  mahasiswa: number;
  dosenPA: string;
}

const demoData: Kelas[] = [
  { id: 1, kode: '2021-A', nama: 'Kelas A Angkatan 2021', prodi: 'Teknik Informatika', tahunMasuk: 2021, semester: 7, mahasiswa: 35, dosenPA: 'Dr. Budi Santoso' },
  { id: 2, kode: '2021-B', nama: 'Kelas B Angkatan 2021', prodi: 'Teknik Informatika', tahunMasuk: 2021, semester: 7, mahasiswa: 32, dosenPA: 'Ir. Ahmad Yani' },
  { id: 3, kode: '2022-A', nama: 'Kelas A Angkatan 2022', prodi: 'Teknik Informatika', tahunMasuk: 2022, semester: 5, mahasiswa: 38, dosenPA: 'Dr. Rudi Hartono' },
  { id: 4, kode: '2022-B', nama: 'Kelas B Angkatan 2022', prodi: 'Sistem Informasi', tahunMasuk: 2022, semester: 5, mahasiswa: 36, dosenPA: 'Dra. Siti Aminah' },
  { id: 5, kode: '2023-A', nama: 'Kelas A Angkatan 2023', prodi: 'Teknik Informatika', tahunMasuk: 2023, semester: 3, mahasiswa: 40, dosenPA: 'Dewi Lestari' },
  { id: 6, kode: '2024-A', nama: 'Kelas A Angkatan 2024', prodi: 'Sistem Informasi', tahunMasuk: 2024, semester: 1, mahasiswa: 42, dosenPA: 'Prof. Dr. Hendra Wijaya' },
];

const KelasPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const columns: Column<Kelas>[] = [
    {
      key: 'kode',
      header: 'Kelas',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-mono font-medium">{item.kode}</p>
            <p className="text-xs text-muted-foreground">{item.nama}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'prodi',
      header: 'Program Studi',
      render: (item) => (
        <Badge className={item.prodi === 'Teknik Informatika' ? 'bg-blue-500/10 text-blue-600' : 'bg-purple-500/10 text-purple-600'}>
          {item.prodi === 'Teknik Informatika' ? 'TI' : 'SI'}
        </Badge>
      ),
    },
    {
      key: 'tahunMasuk',
      header: 'Angkatan',
    },
    {
      key: 'semester',
      header: 'Semester',
      render: (item) => <span>Semester {item.semester}</span>,
    },
    {
      key: 'mahasiswa',
      header: 'Mahasiswa',
      render: (item) => (
        <Badge variant="outline">{item.mahasiswa} Mhs</Badge>
      ),
    },
    {
      key: 'dosenPA',
      header: 'Dosen PA',
    },
    {
      key: 'actions',
      header: 'Aksi',
      className: 'text-right',
      render: () => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Manajemen Kelas</h1>
          <p className="text-muted-foreground">Kelola kelas/angkatan mahasiswa</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Kelas
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-display">Tambah Kelas Baru</DialogTitle>
              <DialogDescription>
                Isi formulir berikut untuk menambahkan kelas baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kode">Kode Kelas</Label>
                  <Input id="kode" placeholder="2024-A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tahun">Tahun Masuk</Label>
                  <Input id="tahun" type="number" placeholder="2024" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Kelas</Label>
                <Input id="nama" placeholder="Kelas A Angkatan 2024" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Program Studi</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih prodi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ti">Teknik Informatika</SelectItem>
                      <SelectItem value="si">Sistem Informasi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kapasitas">Kapasitas</Label>
                  <Input id="kapasitas" type="number" placeholder="40" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Dosen Pembimbing Akademik</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih dosen PA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Dr. Budi Santoso</SelectItem>
                    <SelectItem value="2">Ir. Ahmad Yani</SelectItem>
                    <SelectItem value="3">Dr. Rudi Hartono</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => setIsOpen(false)}>Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Daftar Kelas</CardTitle>
          <CardDescription>Total {demoData.length} kelas terdaftar</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={demoData}
            searchPlaceholder="Cari kelas..."
            searchKey="nama"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default KelasPage;
