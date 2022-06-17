# MST-Based-Clustering-UI

## Deskripsi Program

MST-Based Clustering merupakan salah satu algoritma unsupervised pada machine learning yang banyak digunakan. Jika diberikan sebuah dataset dengan n buah titik random, algoritma ini akan membangun sebuah Minimum Spanning Tree (MST), kemudian melakukan pengelompokkan data dengan cara memotong sisi MST mulai dari sisi dengan bobot terbesar. Jumlah sisi yang dipotong menentukan jumlah cluster yang akan dibuat, untuk setiap n cluster akan ada n-1 pemotongan sisi mulai dari sisi dengan bobot terbesar.

## Teknologi dan Framework

Graphical User Interface pada website MST-Based CLustering dibuat menggunakan:
- React Typescript
- d3 (Menampilkan bidang koordinat pada website)
- Docker.

## Cara Menggunakan

1. Membuat Sebuah Cluster
- Upload data CSV pada <strong>Choose File</strong>.
- Input jumlah cluster yang diinginkan.
- Klik <strong>Create</strong>.
<hr>
<strong>Format tabel CSV yang diupload.</strong>
<table>
  <tr>
    <th>No</th>
    <th>Atribut 1 (X)</th>
    <th>Atribut 2 (Y)</th>
  </tr>
  <tr>
    <td>1</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>2</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>3</td>
    <td></td>
    <td></td>
  </tr>
</table>
<hr>
2. Menunjukkan Riwayat Cluster
<br>
Klik button <strong>Show</strong> pada cluster yang ingin ditunjukkan

## Screenshot Hasil Percobaan

1. Membuat Sebuah Cluster
<img src="https://github.com/TubesForLyfe/MST-Based-Clustering-UI/blob/9f2e70a130af857dede3e5c7ffda19e72edaf7e4/screenshots/CreateCluster.PNG" style="width: 75%; height: 75%;"/>

2. Menunjukkan Riwayat Cluster
<img src="https://github.com/TubesForLyfe/MST-Based-Clustering-UI/blob/9f2e70a130af857dede3e5c7ffda19e72edaf7e4/screenshots/ClusterLog.PNG" style="width: 75%; height: 75%;"/>

## Referensi Belajar

- https://bibliografi.my.id/contoh-soal-algoritma-prim-dan-kruskal/
- https://www.youtube.com/watch?v=00pzxH7YjYY
- https://mherman.org/blog/dockerizing-a-react-app/
