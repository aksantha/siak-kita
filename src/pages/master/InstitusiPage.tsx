import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, MapPin, Phone, Mail, Calendar, Save, Upload } from 'lucide-react';
import heroCampus from '@/assets/hero-campus.jpg';

const InstitusiPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Identitas Institusi</h1>
        <p className="text-muted-foreground">Kelola informasi institusi pendidikan</p>
      </div>

      {/* Hero Banner */}
      <div className="relative h-48 rounded-xl overflow-hidden">
        <img
          src={heroCampus}
          alt="Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <div className="text-white">
            <h2 className="font-display text-2xl font-bold">Universitas Teknologi Indonesia</h2>
            <p className="text-white/80">Mewujudkan generasi unggul berbasis teknologi</p>
          </div>
          <Button variant="secondary" className="gap-2">
            <Upload className="h-4 w-4" />
            Ganti Banner
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informasi Umum */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Informasi Umum
            </CardTitle>
            <CardDescription>Data identitas institusi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Institusi</Label>
              <Input id="nama" defaultValue="Universitas Teknologi Indonesia" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="singkatan">Singkatan</Label>
              <Input id="singkatan" defaultValue="UTI" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tahun">Tahun Berdiri</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="tahun" defaultValue="2005" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="akreditasi">Akreditasi</Label>
                <Input id="akreditasi" defaultValue="A (Unggul)" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="visi">Visi</Label>
              <Textarea
                id="visi"
                rows={2}
                defaultValue="Menjadi universitas teknologi terkemuka yang menghasilkan lulusan berkompeten dan berkarakter"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="misi">Misi</Label>
              <Textarea
                id="misi"
                rows={3}
                defaultValue="1. Menyelenggarakan pendidikan berkualitas berbasis teknologi
2. Mengembangkan penelitian inovatif
3. Melaksanakan pengabdian kepada masyarakat"
              />
            </div>
          </CardContent>
        </Card>

        {/* Kontak */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Alamat & Kontak
            </CardTitle>
            <CardDescription>Informasi kontak institusi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="alamat">Alamat Lengkap</Label>
              <Textarea
                id="alamat"
                rows={2}
                defaultValue="Jl. Pendidikan No. 123, Kelurahan Kampus, Kecamatan Ilmu"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kota">Kota</Label>
                <Input id="kota" defaultValue="Jakarta" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kodepos">Kode Pos</Label>
                <Input id="kodepos" defaultValue="12345" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="telepon">Telepon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="telepon" defaultValue="(021) 1234-5678" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" defaultValue="info@uti.ac.id" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="https://www.uti.ac.id" />
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Logo Institusi</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Simpan Perubahan
        </Button>
      </div>
    </div>
  );
};

export default InstitusiPage;
