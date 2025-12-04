import svgPaths from "./svg-s8131oafzg";

function CalendarIcon() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Calendar Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Calendar Icon">
          <path d={svgPaths.p2cc22600} id="Icon" stroke="var(--stroke-0, #D9E63F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function EventsNavButton() {
  return (
    <div className="bg-white h-[78px] relative shrink-0 w-[396px]" data-name="Events NavButton">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[15px] h-[78px] items-center px-[50px] py-[44px] relative w-[396px]">
          <CalendarIcon />
          <p className="font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[24px] text-black text-nowrap whitespace-pre">Events</p>
        </div>
      </div>
    </div>
  );
}

function Users() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Users">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Users">
          <path d={svgPaths.p1d9d9900} id="Icon" stroke="var(--stroke-0, #01A4FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function ClubsNavButton() {
  return (
    <div className="bg-neutral-100 h-[78px] relative shrink-0 w-[396px]" data-name="Clubs NavButton">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[15px] h-[78px] items-center px-[50px] py-[44px] relative w-[396px]">
          <Users />
          <p className="font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[24px] text-black text-nowrap whitespace-pre">Clubs</p>
        </div>
      </div>
    </div>
  );
}

function SideNav() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[3px] h-[978px] items-start left-0 px-0 py-[2px] shadow-[0px_30px_50px_0px_rgba(0,0,0,0.25)] top-[102px] w-[396px]" data-name="Side Nav">
      <EventsNavButton />
      <ClubsNavButton />
    </div>
  );
}

function MenuIcon() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="MenuIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="MenuIcon">
          <path d="M6 24H42M6 12H42M6 36H42" id="Icon" stroke="var(--stroke-0, #757575)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function TopNav() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[20px] h-[102px] items-center left-0 px-[50px] py-[8px] top-0 w-[1920px]" data-name="TopNav">
      <MenuIcon />
      <p className="font-['Hanken_Grotesk:Black',sans-serif] font-black h-[48px] leading-[normal] relative shrink-0 text-[40px] text-black w-[226px]">ClubNav</p>
    </div>
  );
}

function Acc() {
  return (
    <div className="absolute content-stretch flex gap-[20px] inset-[2.04%_2.5%_92.69%_87.92%] items-center" data-name="Acc">
      <div className="relative shrink-0 size-[57px]" data-name="AccPlaceholder">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57 57">
          <circle cx="28.5" cy="28.5" fill="var(--fill-0, #F5F5F5)" id="AccPlaceholder" r="28.5" />
        </svg>
      </div>
      <p className="font-['Hanken_Grotesk:Regular',sans-serif] font-normal h-[23px] leading-[normal] relative shrink-0 text-[24px] text-black w-[107px]">Full Name</p>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute h-[1080px] left-0 top-0 w-[1920px]" data-name="Navigation">
      <div className="absolute bg-white bottom-[0.46%] left-0 right-0 top-0" data-name="Background" />
      <SideNav />
      <TopNav />
      <Acc />
    </div>
  );
}

function Star() {
  return (
    <div className="absolute inset-[12.89%_2.8%_73.2%_94.18%]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Star">
          <path d={svgPaths.p2823b580} id="Icon" stroke="var(--stroke-0, #757575)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[#e9e9e9] h-[35px] relative rounded-[45px] shrink-0 w-[87px]" data-name="Tag">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[35px] items-center justify-center px-[52px] py-[9px] relative w-[87px]">
          <p className="font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">STEM</p>
        </div>
      </div>
    </div>
  );
}

function Tag1() {
  return (
    <div className="bg-[#e9e9e9] h-[35px] relative rounded-[45px] shrink-0 w-[84px]" data-name="Tag">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[35px] items-center justify-center px-[52px] py-[9px] relative w-[84px]">
          <p className="font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">Ethics</p>
        </div>
      </div>
    </div>
  );
}

function Tag2() {
  return (
    <div className="bg-[#e9e9e9] h-[35px] relative rounded-[45px] shrink-0 w-[52px]" data-name="Tag">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[35px] items-center justify-center px-[52px] py-[9px] relative w-[52px]">
          <p className="font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">+3</p>
        </div>
      </div>
    </div>
  );
}

function Tags() {
  return (
    <div className="absolute content-stretch flex gap-[6px] inset-[69.59%_46.47%_12.37%_27.21%] items-center" data-name="Tags">
      <Tag />
      <Tag1 />
      <Tag2 />
    </div>
  );
}

function Club() {
  return (
    <div className="h-[194px] relative shrink-0 w-full" data-name="Club">
      <div className="absolute bg-[#d9d9d9] inset-0 rounded-[25px]" data-name="ClubCard" />
      <Star />
      <Tags />
      <p className="-webkit-box absolute font-['Hanken_Grotesk:Regular',sans-serif] font-normal inset-[35.05%_2.8%_38.14%_27.44%] leading-[normal] overflow-ellipsis overflow-hidden text-[#606060] text-[20px]">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique, nulla id vestibulum iaculis, mauris purus vestibulum est, in egestas libero nunc vitae lorem. Etiam eget ullamcorper turpis, quis posuere nunc. Suspendisse lectus justo, posuere ac volutpat tempor, finibus vel ligula. `}</p>
      <p className="absolute font-['Hanken_Grotesk:Regular',sans-serif] font-normal inset-[13.92%_59.24%_70.1%_27.44%] leading-[normal] text-[24px] text-black text-nowrap whitespace-pre">Club Name</p>
      <div className="absolute bg-neutral-100 bottom-0 left-0 right-[76.15%] rounded-bl-[25px] rounded-tl-[25px] top-0" data-name="ImagePlaceholder" />
    </div>
  );
}

function Clubs() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[25px] items-start left-[518px] top-[584px] w-[893px]" data-name="Clubs">
      {[...Array(3).keys()].map((_, i) => (
        <Club key={i} />
      ))}
    </div>
  );
}

function RemoveButton() {
  return (
    <div className="absolute bg-white bottom-0 left-[67.66%] right-0 rounded-[45px] top-[52.05%]" data-name="RemoveButton">
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[45px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[52px] py-[9px] relative size-full">
          <p className="font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap whitespace-pre">Remove</p>
        </div>
      </div>
    </div>
  );
}

function FavoriteClub() {
  return (
    <div className="h-[73px] relative shrink-0 w-full" data-name="FavoriteClub">
      <RemoveButton />
      <p className="[white-space-collapse:collapse] absolute font-['Hanken_Grotesk:SemiBold',sans-serif] font-semibold inset-[4.11%_0.37%_49.32%_30.86%] leading-[normal] overflow-ellipsis overflow-hidden text-[20px] text-nowrap text-white">Society of Women Engineers</p>
      <div className="absolute bg-white bottom-[2.74%] left-0 right-[73.61%] rounded-[15px] top-0" data-name="FavoriteClubPlaceholderImage" />
    </div>
  );
}

function FavoriteClubs() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11px] items-start left-[1497px] top-[256px] w-[269px]" data-name="FavoriteClubs">
      {[...Array(5).keys()].map((_, i) => (
        <FavoriteClub key={i} />
      ))}
    </div>
  );
}

function FavoriteClubs1() {
  return (
    <div className="absolute contents left-[1455px] top-[143px]" data-name="Favorite Clubs">
      <div className="absolute bg-[#6bbae6] h-[696px] left-[1455px] rounded-[25px] top-[143px] w-[364px]" data-name="FavoriteCard" />
      <p className="absolute font-['Hanken_Grotesk:Bold',sans-serif] font-bold leading-[normal] left-[1497px] text-[24px] text-nowrap text-white top-[188px] whitespace-pre">Favorited Clubs</p>
      <FavoriteClubs />
    </div>
  );
}

function Component() {
  return (
    <div className="bg-[#d9d9d9] h-[64px] relative rounded-[45px] shrink-0 w-[90px]" data-name="+">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[64px] items-center justify-center px-[52px] py-[9px] relative w-[90px]">
          <p className="font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[32px] text-black text-nowrap whitespace-pre">+</p>
        </div>
      </div>
    </div>
  );
}

function Filter() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[64px] items-center justify-center px-[32px] py-[9px] relative rounded-[45px] shrink-0" data-name="Filter">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[45px]" />
      <p className="font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Show Favorites</p>
    </div>
  );
}

function Filter1() {
  return (
    <div className="bg-[#d9d9d9] box-border content-stretch flex font-['Hanken_Grotesk:Regular',sans-serif] font-normal gap-[10px] h-[64px] items-center justify-center leading-[normal] px-[32px] py-[9px] relative rounded-[45px] shrink-0 text-[20px] text-black text-nowrap whitespace-pre" data-name="Filter">
      <p className="relative shrink-0">STEM</p>
      <p className="relative shrink-0">X</p>
    </div>
  );
}

function Filter2() {
  return (
    <div className="bg-[#d9d9d9] box-border content-stretch flex font-['Hanken_Grotesk:Regular',sans-serif] font-normal gap-[10px] h-[64px] items-center justify-center leading-[normal] px-[32px] py-[9px] relative rounded-[45px] shrink-0 text-[20px] text-black text-nowrap whitespace-pre" data-name="Filter">
      <p className="relative shrink-0">Ethics</p>
      <p className="relative shrink-0">X</p>
    </div>
  );
}

function Filter3() {
  return (
    <div className="bg-[#d9d9d9] box-border content-stretch flex font-['Hanken_Grotesk:Regular',sans-serif] font-normal gap-[10px] h-[64px] items-center justify-center leading-[normal] px-[32px] py-[9px] relative rounded-[45px] shrink-0 text-[20px] text-black text-nowrap whitespace-pre" data-name="Filter">
      <p className="relative shrink-0">Women</p>
      <p className="relative shrink-0">X</p>
    </div>
  );
}

function Filter4() {
  return (
    <div className="bg-[#d9d9d9] box-border content-stretch flex gap-[10px] h-[64px] items-center justify-center px-[32px] py-[9px] relative rounded-[45px] shrink-0 w-[71px]" data-name="Filter">
      <p className="font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">+2</p>
    </div>
  );
}

function Filters() {
  return (
    <div className="absolute bottom-[4.21%] content-stretch flex gap-[13px] items-center left-[0.9%] right-0 top-[65.89%]" data-name="Filters">
      <Component />
      <Filter />
      <Filter1 />
      <Filter2 />
      <Filter3 />
      <Filter4 />
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="relative shrink-0 size-[45px]" data-name="Search Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
        <g id="Search Icon">
          <path d={svgPaths.p19a24480} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="absolute bg-neutral-100 bottom-[66.36%] box-border content-stretch flex gap-[10px] items-center left-0 px-[29px] py-[12px] right-0 rounded-[45px] top-0" data-name="Search Bar">
      <SearchIcon />
    </div>
  );
}

function FilterSearch() {
  return (
    <div className="absolute h-[214px] left-[507px] top-[334px] w-[904px]" data-name="Filter & Search">
      <Filters />
      <p className="absolute font-['Hanken_Grotesk:Regular',sans-serif] font-normal inset-[49.07%_88.13%_36.45%_1.23%] leading-[normal] text-[24px] text-black text-nowrap whitespace-pre">Filter by:</p>
      <SearchBar />
    </div>
  );
}

export default function Clubs1() {
  return (
    <div className="bg-[#e9e9e9] relative size-full" data-name="Clubs">
      <Navigation />
      <Clubs />
      <FavoriteClubs1 />
      <FilterSearch />
      <p className="absolute font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] left-[507px] text-[#606060] text-[32px] text-nowrap top-[208px] whitespace-pre">Explore diverse student organizations</p>
      <p className="absolute font-['Hanken_Grotesk:Regular',sans-serif] font-normal leading-[normal] left-[507px] text-[48px] text-black text-nowrap top-[137px] whitespace-pre">Clubs</p>
    </div>
  );
}