import { Obj, anys } from "@/types";
import axios from 'axios';
import url from 'url';
import fs from 'fs';


interface ImgToBase64Props {
	url:string;
	retry?:string;
}

interface GetDomainReturn {
	hostname:string;
	domain:string;
}

interface CreateColumnsProps {
	sources:anys;
	columns:number;
	sourceHeight:(s:any) => number;
}

export async function imgToBase64({ url, retry }:ImgToBase64Props):Promise<string> {
	if (!/^https?:\/\//.test(url)) url = 'http://' + url;
	try {
		const response = await axios.get(url, { responseType: 'arraybuffer' });
		const base64 = Buffer.from(response.data, 'binary').toString('base64');
		return "data:image/png;base64," + base64;
	} catch (error) {
		if (retry) {
			return await imgToBase64({ url: retry });
		}
		throw error;
	}
}

export function getDomain(fullUrl:string):GetDomainReturn {
	try {
		if (!/^https?:\/\//.test(fullUrl)) fullUrl = 'http://' + fullUrl;
		const parsedUrl = url.parse(fullUrl);
		const hostname = parsedUrl?.hostname || "";
		const domainParts = hostname.split('.');
		const domain = domainParts.slice(-2).join('.');
		return { hostname, domain };
	} catch (error) {
		return { hostname: "", domain: "" };
	}
}

export function count(str:string, word:string):number {
	return (str.match(new RegExp(word, "g")) || []).length;
};

export function mapObjValues(obj:Obj|undefined, type:(s:any) => any) {
	if (!obj) return {};
	const newObj:Obj = {};
	for (const [key, value] of Object.entries(obj)) {
    if ([null, undefined, NaN].includes(value)) continue;
	  newObj[key] = type(value);
	}

	return newObj;
};

export function createUrlParams(obj:Obj|undefined):string {
	if (!obj) return '';
	obj = mapObjValues(obj, value => String(value));
	return new URLSearchParams(obj).toString();
}

export function min_index(list:number[]):number {
  let minIndex = 0;
  for (let i = 1; i < list.length; i++) {
    if (list[i] < list[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}

export function max_index(list:number[]):number {
  let maxIndex = 0;
  for (let i = 1; i < list.length; i++) {
    if (list[i] > list[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}

export function list_of(val:any, length:number):any[] {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(val);
  }
  return result;
}

export function rate(x1:number, y1:number, x2:number):number {
	return (y1 * x2) / x1;
}

export function sleep<T>(time: number, callback?: () => T): Promise<T | void> {
  return new Promise<T | void>((resolve, reject) => {
    setTimeout(() => {
      if (callback) resolve(callback());
      resolve();
    }, time);
  });
}

export function createColumns({
	sourceHeight,
	sources,
	columns=3
}:CreateColumnsProps):anys[] {
	const raw_grid:anys[] = list_of([], columns);
	const columns_len = list_of(0, columns);
	for (let src of sources) {
		let src_height = sourceHeight(src);
		let min_idx = min_index(columns_len)
		raw_grid[min_idx] = [...raw_grid[min_idx], src];
		columns_len[min_idx] += src_height;
	}
	return raw_grid;
}

export function seconds2Time(secondsRaw:number):string {
  let sec_num = Number(secondsRaw.toFixed(0));
  let hours:number | string = Math.floor(sec_num / 3600);
  let minutes:number | string = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds:number | string = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = 0 + hours;}
  if (minutes < 10) {minutes = "0" + minutes;}
  if (seconds < 10) {seconds = "0" + seconds;}
  return `${(hours ? (hours + ':') : '') + minutes + ':' + seconds}`;
}

export async function requestBlob(url:string):Promise<any> {
  if (!url) return;
  return axios({
    url: url,
    method:'GET',
    responseType: 'blob'
  })
  .then(res => window.URL.createObjectURL(new Blob([res.data])))
  .catch(err => { console.log(err); return null })
}

export function ellipsisText(text:string, maxLength:number):string {
  if (text.length <= maxLength) return text;
  const ellipsis = '...';
  const truncatedText = text.slice(0, maxLength - ellipsis.length);
  return truncatedText + ellipsis;
}

export function time2second(time:string):number {
	if (!time) return 0;
  const parts = time.split(':').reverse();
  let seconds = parseInt(parts[0], 10);
  let minutes = 0;
  let hours = 0;

  if (parts.length > 1) {
    minutes = parseInt(parts[1], 10);
  }

  if (parts.length > 2) {
    hours = parseInt(parts[2], 10);
  }

  return seconds + (minutes * 60) + (hours * 60 * 60);
}

export function shuffle(list:any[]):any[] {
	const randomSort = (a:any, b:any) => Math.random() - 0.5;
	return [...list].sort(randomSort);
}

export function getOrientation(width:number,height: number):string {
  const variation = Math.abs(width - height);
  if (variation <= 50) {
    return "S";
  } else if (width > height) {
    return "H";
  } else {
    return "V";
  }
}

export function shortValue(value:number, suffix:string=""):string {
  if (value < 1000) {
    return `${value} ${suffix}`;
  } else if (value < 1000000) {
    return `${(value / 1000).toFixed(1)}K ${suffix}`;
  } else if (value < 1000000000) {
    return `${(value / 1000000).toFixed(2)}M ${suffix}`;
  } else {
    return `${(value / 1000000000).toFixed(2)}B ${suffix}`;
  }
}

// export function freezeDimensions(element, freeze:boolean) {
//   if (!element) return;
//   if (freeze) {
//     const elementWidth = element.offsetWidth;
//     const elementHeight = element.offsetHeight;
//     element.style.minWidth = `${elementWidth}px`;
//     element.style.width = `${elementWidth}px`;
//     element.style.height = `${elementHeight}px`;
//   } else {
//     element.style.minWidth = '';
//     element.style.width = 'auto';
//     element.style.height = 'auto';
//   }
// }
