import React, { useEffect, useState } from 'react';


//Material UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';



const style = {
  align: "center",
  border: '1px solid black'
};

const matches = [
  {
    id: 2,
    name: "Bob",
    username: "bobbyboy",
    picture: "data:image/png;base64,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",

  },
  {
    id: 2,
    name: "Girly",
    username: "girl420",
    picture: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUQExIWFRIVFRUXFhYVFRUWFxUYFRUXGBUVGBcYHSgiGholGxUXITEhJSkrLi4uFyAzODMsNygtLisBCgoKDg0OGhAQGisfHx0tLS0tLS0tLS0tKy0rLS0tLS0tLS0tLS0tLS0tLS02NS0tLS0tLS03Ky02LSs4LS03K//AABEIAOAA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBBAcDAv/EAEMQAAIBAgIGBggEAwUJAAAAAAABAgMRBCEFEjFBUWEGEyJxgZEyQlJyobHB0RQjYuGCkvA0Q6KywgcVJDNTc4PS8f/EABkBAQADAQEAAAAAAAAAAAAAAAABAgQDBf/EACARAQEAAgMBAQADAQAAAAAAAAABAhEDEiExIgQTUWH/2gAMAwEAAhEDEQA/AOkgA6uQAAAAAAAAAAAAAAGvWx9GD1ZVqcZcJTin5NgbAIer0jo/iaeEptVas05S1ZLVpwW2UpbG9yis+4llNO6TTa22ey+av4EbH0ALEgAAAAAAAAAAAAAAAAAAAAAAAAAAB5168aa1pyUYre3Y1tKaQVCDla73K6S729yRSsbjniHr1JPVW+1orlGL297OWfLMV8cLkseI6V0VdU4zqNb7KEF3yls8ivaV6fOCdnGL4QjrW/jqZf4SLxE9aPYjbNpXvkrZyyzbIutoqn683xeolF+crvyRnvNa6zjjS0t04xU3dVJpcOskl5QaXwIWhjesu2rNu7a2t/VlywmhMK1rfhpz/VJyfzsjQxuj6WerTp01znFW+JHdPVWMXiHfZ45XNzROm6sFKFOtUp6zs9ScouStkm47HuubtLARqRcIuN2nazvnuztsuaVDDartLVTW9NXXOzI7GnvUdaWU6tSUf11Jz8c27mzhcRUouPV1aifFSatwtZmvVwE4pSUsmrq2x5PLhfivua9DFQUtSqrP2o3j5ky2mnTdCdLppKNWWuuLjaXmvqW7A6UpVsoTTl7Lyl5bzjU8BVitejLXW23reFtvgeeE01Wuuzd3yd7OL79qZfHls/6i8cruoKT0Q6X9Y1h8RNKbsoSeV37Enx4MuxpxymU3HCyzygALIAAAAAAAAAAAAAAAADX0hi40YOpLkkuMnkl5mwU3pjpOM6kMPB3cG5ztsi7WV3xzfmUzy6zacZu6aWm8Xrz7XbldWhsV9zlbctyPnD6OnUd5tvksorksskbGidHqzqzsltbluXF8+XnwNh4p1JasFLU3L1pc5box5Hn5X3bXI160JLKEUvdXzm879xqSwEoJzlOMN7bsreMv/pt6Tx0oRcKbSaylNLKHKPFlSq6NlWd5Slq823Kb7+BEm0196Q0hRSspyqJPanaLfBSlm/BELWpVJvWahCPK7fm7k9LRUaaUpJXtaMeC5LcuZGaRm0ryVlw+/wBiyELXx86cuxJ6y3t28kj6xVRVJKo0lJrtWyUk96tsfw2GtlJ3azefgTGi8Eq8Wk+2lrau+ze1cS/xX68dGY2eHi4yXWUb2cG9vBxlueZvY7R1Gv8Am0ZXg9qkrTg7L0l9VkeLwrhCUGrOM4+Vn9EbWB0bNNTpu018eK7s9hXadI7BRr4eT6uTWd3F5xb7tz7icoVqOOynahi90tkalsrS5/HvJClBTleUVGVs4tbbbcuf0PevoCFWOvTXbS2LNu3+ZbrbSNp0iKmDkn1denrJZW2tcHF7/n3nUejuO66hFuWtOKUZPjbJSfelfvuc8pVlNakp2lHY5XaX6XfNW2E30ZxsqFZQmrRnaPLN9mSe/wDc6cXJ1yUzx3F7ABuZgAAAAAAAAAAAAAAAEb0hx/4ehOa9O2rD3nsfhm/ApWicJqJN5zn2pN5vkn8yz9K6eu6MH6N5N+Fvu/MqbxEqk7Qe9xXctr+hj58v1p34p5tMYiprvUWxZ/VykeMsdGPZTapq+s1tqPgnujzIivjLtUYej6z9tra3+lChR6x682urjxtq5ceL/Sslz2GeOyVwlDr2pyilBeitkPe/VmS7w8Yq6WftSVl4JEFLTG6nHLYpSyvzSN6nXur1G3Lhs83u7idjSxtKKvKKvxnJXeW3VXEpunKTk+1fbkt/8W6/I6POMdTjN7FbKK3ZfQhJdHdduc7238c/VXN7xPE62oNHCN3k724/b5ElhtC1JfnRupLOKW1JbLFjrYelB6urez9FPfzf0PNVGnrJ2Z2w48s5v4458mOF19eNBLEQanlUSte2T4X4NNGzonDXtB3jUV7bM+XMzPVk+sj2anrLdJcVzNx0VPVeyWxS5q+q/nF+BxyxuN1XWWZTce01CdlUjt2SWTvvs90uRr1JVcK1OMlUp+2t3vL6nzKprXhP0ZNa3GMrZTXBmrGpUhlJ3t2X+pc+L+ZAkMdgcPj4upB9ViUrvVy1n3bGVOOOrYaSjJtxvlf5p9+5m7Ko6bcoPVcWnk9ie7u4HliKjqzjJq6fpJfNcy0qtdiw1ZVIRqLZOMZLukr/AFPQjejf9lorbaFr8otpfBEkejPjIAAkAAAAAAAAAAAAAFd6ZycYQkv1LzsVWio0aUnvUUvGXam+9t2Ll0rpXo61r6rz5J5X87HPsXUlUhFJWu7vwRh55rJp4r48qMlHtSzcrWgtrW5N7or48z2blVeexbEvRia2Ew3rPNy+X7/Q96tS/wCXFX48+RntdZGxRq56sEr75vhvtwjz3m46urZRvlkuLfHv+SNSMdXsrb67/wBK5IiNK9LqFC6jarV9mPoR757+5ESXLyJ8n1Z8LWdN677Us7K+/wDrfuPnF6WnJWTt3bFyX3KFS/2gzXpUItvg4W8p05E9gdJ1MZS63DVYU5RajOlUw2HqNSavdSjGN42T3bjRhj1v7jnyZWz8t0Fb0xpvE4aWpVrQcrejTw9CNr52blF23bt5pUOnlSKadGM9mclSVv5KSNf9v+Rm/pv+riesMRaLi77Lr+vC5Rl08rrZRov3ot/Jo3tG9LpYqapVKNGnk7SpKabfB60mvhuOXNe+Pz46cWFwy+rTXxF9We9vVmue9+ab8TNKWvFr9PyzX9cjWxsXC65RkvFW+nxPvA3bclsafx/e5kru1MbDsKe9LPmrP6/M1qVR6utsabv3P97GxiXeMY7XKUYrzu/geWKhqtpe6l4ppedkIh1jo3/ZaL4wUv5m5fUkjywlBU6cKa2QjGK/hSX0PU9OTUZKAAlAAAAAAAAAAAAAA+K9JTjKD2STT7mrHNK2BcXKk/SUtTLY25NN+UTpxSdKU1DFVL75KS7pRb+bZn/kT87deK+oLFwtkt+S5JJJvysvMidKaVp4OOzWqv0YrLxfBEljcaoRqVbX1IvZ+lXdudznWInKtJ1ZbZZ93IycfH2u60ZZdXzpLS9evlKTUPYjkn38fEjeqJD8PyHUcjXJr449kf1ZP9C8c6FeUernUhUg1KNNxUlqtOM+12cs1num99jQ/Dlp6IYDUhKs1nUtq+5HY/F5+RMw7+VXLPr6rvSys6uKm+rlTVlaMtW+e2XZ7Ob4bkuBEdUXjpjgdeEa6WdPKXuS3+Ds+5sq/wCH5C49fInHPtNo/qj1wl4TjLZaS+Zt9RyMPD8iNJ26lp2j2U0ttNW8lJfU0NFS/La5fK8vubeAxPW4bDuTzdJxffCTj9PiaujoWpX463xTX7GOzXju8KrSkm92pbzu/kiU6GaPWJxMXLONNutLfeWslCL8bv8AhITFO0dbe8krrfaKfxOjdBNESw9CU6iaqVWnZqzjBX1U+ecn4rgduHDtXLkuosoANzMAAAAAAAAAAAAAAAAFY6X4PONdcNSXLO8fnJeRZyP09g3Xw9SnH0mrx5uL1kvG1vEpyY9sbFsbq7c7o4V15umlaCi8uLy+5SJ6OdCTpzyim9Sb9GSexX3SWyzz7zqWAUaepJPsvzzXaIvS2G1KkoWvF555pp5mT+NfbjXbn8kyiifhB+ELFU0RReyLh/25SgvKLt8D6paLhHO8/wCeX0sbOjN3VzC6P66fVr0E/wA2W5LbqJ+0/gvAt6SSslZLJIxTpqK1YpJLclZH0WxmlcstvmcFJOLV000096e1FPr4B0ZulLZ/dyeyceF/aW9eJcjzr0YzWrKKlF7mk0MsdmOWlT/CGJYa2byRYf8AdFPdKa5a7f8AmuYjoSje8oufvylJfyvL4Feq/duaIt+Fw7i7pdbn/wCSS/0sYesopx3WlflazN6VRakIJJKEbWWSXaeSS7yH0XF1aypL+8qwhbk5Xm/5b+Riyw/TVMppZug+gI1rYmrG8IW6tPZKS9Zrelu5vkdAPmnTUUoxSUUrJJWSS2JI+jbhj1mmbLLtdgALIAAAAAAAAAAAAAAAAAABWtPaJfalB6qlLWT9iptv7re3vfEgJVvxVPVtq4ildThvsttuK4ci/YrDqpGUHkpK1+HBrmnZnOtMYees5KH/ABVF2mll1sd04Puz+Hfkzw659o7Y5dsetaYMOv1lp8duVvNcTJsnsZaAAlAAAB8zmopt7FmfR8yjfaRUsUr2u8m83yvuNz/Zzox/i51Wrqn1jvwlUlaK/l1jyw1FznGEdsmkdD0Ro6OHhqpLWbvJpbXu8jllj7HTDK6qQAB0AAAAAAAAAAAAAAAAAAAAABghOkWh3XSqQyqw2brrhfiThgjSHKsVGSk7x1aib1sra3vLjzPiDvtTXJ2+h0rSOiaNdduHa3SWUvPeV3FdD5L/AJdRNcJ3T80MdT4rluqyCXq9GMTH1E+6SPF6BxK/umW2rqo4EitBYn/pM9afRrEv1Eu+S+42aqJEU3kld8F8iy4bofPbUqRS4Ru/i7Fg0boWjQzjG8vaeb/YjaZKj+jOg3R/NqL8xrJeyn9Sw2CMkfV5AAEpAAAAAAAAAAAAAAAAAAAAAAGDIGLAHhicXTp5znGPe8/IjRt7GSFrdKMNHZKUvdi7eZqy6YUd1Ofw+5GldxZLGCuR6YUt9Ofhb7mzR6VYaW2Uo98X9Bo3E1YyjXwuOpVfQnGXc1fyNgnSdsgAJAASAAAAAAAAAAAAAAAAAAAAwzEpWzeSIGSN0ppqlh/Sd5borb48CE070nzdOi8tjn/6/cq0nd3ebe8SKXJM6R6S1qt1F9XHhHb4shpSbd223xeZgyWkV9AASBhmQBiLazTt3Evo/pFXpZOXWR4Sd34S2kSCB0HRWnaVfJdifsyt8HvJU5QiyaD6TOFqdZ3junvXfxXMrYtMl0B8QqKSUk7pq6aPq4XZABIAAAAAAAAAAAAAAMMEA3vKV0m086rdKm7U1ta9Z/Y3ul2l9RdRB9qS7TW5cO8p6JkUtLGQCyoAAAAAAAAAABixkATfR3TjoPq5u9N/4XxXIvUZJ5p3T2HKmWrojpbP8PN7fQb/AMpRbGraDCAXZABIAAAAAAAAAAAzU0ji1QpyqPcslxe5G2U7prjbyjRWxdqXe9nw+ZCMrpXK9Zzk5Sd5SbbZ8AFo5gAJAAAAAAAAAAAAAAMxm4tNZNO6fCxgwRodJ0Lj1XpRn62yS4NbTfKR0NxurVdJ+jNZe8v2uXZFXTGsgAlIAAAAAAAAYMmAVhs5lpLE9bVnP2pO3dsXyOg6Zq6lCpLhCXxVl8zmthFMmQAWVAAAAAAAAAAAAAAAAAAB6Yas6c4zW2LT8mdQpzUkpLY0n5nK2dE6OVtfD03wWr5OxVbFJgIBcAAAAAf/2Q==",

  },
];


const Matches = () => {
  return (
    <Grid container >
      {matches.map((match) => (
        <Grid item xs={12} style={style}>
          <Avatar src={match.picture} sx={{ cursor: 'pointer' }} referrerPolicy="no-referrer" />
          <Typography variant="h6" align="center">{match.name}</Typography>
        </Grid>
      ))}
    </Grid>
  );

};

const UserProfile = ({ user }) => {
  return (
    <Grid container >
      <Grid item xs={12} style={style}>
        <Avatar src={user.picture}/>
        <Typography variant="h6" align="center">{user.name}</Typography>
      </Grid>
    </Grid>

  );
};

const Icebreaker = () => {
  return (
    <Grid container >
      <Grid item xs={12} style={style}>
        <Typography variant="h6" align="center">Interact with Icebreaker</Typography>
      </Grid>
    </Grid>
  );
};

const Wheel = () => {
  return (
    <Grid container >
      <Grid item xs={12} style={style}>
        <Typography variant="h6" align="center">Wheel</Typography>
      </Grid>
    </Grid>
  );
};


const Main = ({ user, handleLogout, setUser }) => {

  const [activeTab, setActiveTab] = useState('profile');



  return (
    <div className="pageContainer">
      <Grid container style={style}>

        {/* Left Grid */}
        <Grid container item xs={6} sm={6} style={style}>
          <Typography variant="h3" align="center">Left Column</Typography>
          <Grid container item xs={12} style={style}>
            <Grid item xs={12} style={style}>
              <Typography variant="h4" align="center">Wheel of Love</Typography>
            </Grid>
            <Grid item xs={6} style={style}>
              <Typography onClick={ () => setActiveTab('profile') } variant="h6" align="center">Profile</Typography>
            </Grid>
            <Grid item xs={6} style={style}>
              <Typography onClick={ () => setActiveTab('matches')} variant="h6" align="center">Matches</Typography>
            </Grid>
            <Grid item xs={6} style={style}>
              <Typography onClick={ () => setActiveTab('icebreaker') } variant="h6" align="center">Ice Breaker</Typography>
            </Grid>
            <Grid item xs={6} style={style}>
              <Typography onClick={ () => setActiveTab('wheel') } variant="h6" align="center">Wheel/Chat</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Grid */}
        <Grid container item xs={6} sm={6} style={style}>
          <Typography variant="h3" align="center">Right Column</Typography>
          <Grid container item xs={12} style={style}>
            {activeTab === 'matches' && <Matches />}
            {activeTab === 'profile' && <UserProfile user={ user }/>}
            {activeTab === 'icebreaker' && <Icebreaker />}
            {activeTab === 'wheel' && <Wheel />}
          </Grid>
        </Grid>

      </Grid>
    </div>
  );

};

export default Main;
