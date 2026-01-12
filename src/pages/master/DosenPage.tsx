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
import { Plus, Download, Upload, Pencil, Trash2, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Dosen {
  id: number;
  nip: string;
  nama: string;
  email: string;
  telepon: string;
  departemen: string;
  gelar: string;
  keahlian: string;
}

const demoData: Dosen[] = [
  { id: 1, nip: '198501012010011001', nama: 'Dr. Budi Santoso, M.Kom', email: 'budi.santoso@siak.ac.id', telepon: '081234567890', departemen: 'Teknik Informatika', gelar: 'S3', keahlian: 'Machine Learning, Data Science' },
  { id: 2, nip: '198702152011012002', nama: 'Ir. Ahmad Yani, M.T.', email: 'ahmad.yani@siak.ac.id', telepon: '081234567891', departemen: 'Teknik Informatika', gelar: 'S2', keahlian: 'Jaringan Komputer, Keamanan Siber' },
  { id: 3, nip: '199003202012011003', nama: 'Dra. Siti Aminah, M.Si', email: 'siti.aminah@siak.ac.id', telepon: '081234567892', departemen: 'Sistem Informasi', gelar: 'S2', keahlian: 'Analisis Sistem, Manajemen Proyek' },
  { id: 4, nip: '198808082013011004', nama: 'Dr. Rudi Hartono, M.Cs', email: 'rudi.hartono@siak.ac.id', telepon: '081234567893', departemen: 'Teknik Informatika', gelar: 'S3', keahlian: 'Kecerdasan Buatan, NLP' },
  { id: 5, nip: '199105052014012005', nama: 'Dewi Lestari, S.Kom., M.Kom', email: 'dewi.lestari@siak.ac.id', telepon: '081234567894', departemen: 'Sistem Informasi', gelar: 'S2', keahlian: 'Basis Data, Big Data' },
  { id: 6, nip: '198506062015011006', nama: 'Prof. Dr. Hendra Wijaya, M.Sc', email: 'hendra.wijaya@siak.ac.id', telepon: '081234567895', departemen: 'Teknik Informatika', gelar: 'S3', keahlian: 'Algoritma, Struktur Data' },
];

const getInitials = (name: string) => {
  const parts = name.replace(/Dr\.|Ir\.|Prof\.|Dra\.|S\.Kom\.|M\.Kom|M\.T\.|M\.Si|M\.Cs|M\.Sc/g, '').trim().split(' ');
  return parts.filter(p => p.length > 0).map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const DosenPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const columns: Column<Dosen>[] = [
    {
      key: 'nama',
      header: 'Dosen',
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-accent/20 text-accent-foreground text-sm font-medium">
              {getInitials(item.nama)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.nama}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{item.email}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'nip',
      header: 'NIP',
      render: (item) => <span className="font-mono text-sm">{item.nip}</span>,
    },
    {
      key: 'departemen',
      header: 'Departemen',
    },
    {
      key: 'gelar',
      header: 'Pendidikan',
      render: (item) => (
        <Badge variant="outline" className="font-normal">
          {item.gelar}
        </Badge>
      ),
    },
    {
      key: 'keahlian',
      header: 'Bidang Keahlian',
      render: (item) => (
        <div className="max-w-[200px]">
          <p className="text-sm text-muted-foreground truncate">{item.keahlian}</p>
        </div>
      ),
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
          <h1 className="font-display text-3xl font-bold tracking-tight">Manajemen Dosen</h1>
          <p className="text-muted-foreground">Kelola data dosen pengajar</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Dosen
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="font-display">Tambah Dosen Baru</DialogTitle>
                <DialogDescription>
                  Isi formulir berikut untuk menambahkan dosen baru
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nip">NIP</Label>
                    <Input id="nip" placeholder="Masukkan NIP" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input id="nama" placeholder="Termasuk gelar" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@siak.ac.id" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telepon">Telepon</Label>
                    <Input id="telepon" placeholder="08xxxxxxxxxx" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departemen">Departemen</Label>
                    <Input id="departemen" placeholder="Teknik Informatika" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gelar">Pendidikan Terakhir</Label>
                    <Input id="gelar" placeholder="S2, S3, dst" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keahlian">Bidang Keahlian</Label>
                  <Input id="keahlian" placeholder="Machine Learning, Data Science" />
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Daftar Dosen</CardTitle>
          <CardDescription>Total {demoData.length} dosen terdaftar</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={demoData}
            searchPlaceholder="Cari nama atau NIP..."
            searchKey="nama"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DosenPage;
