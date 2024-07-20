import { useMemo } from "react";
import { News } from "../../redux/api";
import './NewsItem.scss';
import { formatDate } from "../../utils/FormatDate";
import { decodeUnicode } from "../../utils/Decode";


const NewsItem: React.FC<{ data: News }> = ({ data }) => {
  return (
    <a href={data.url} target="_blank">
      <div className="news-item">
        <div className="top">
          <div style={{ display: "flex" }}>
            <img src={data.image ? 'https://dummy-rest-api.specbee.site/' + data.image : 'https://picsum.photos/150'} width={'90px'} height={'72px'} className="image" />
            <div>
              <p className="date">{formatDate(data.date)}</p>
              <DecodeHTML data={data.title} className="title" />
            </div>
          </div>
          <p className="source">{data.source}</p>
        </div>
        <DecodeHTML data={data.body} className="body" />
        <p className="author">{data.author}</p>
      </div>
    </a>
  )
}
export default NewsItem;


const DecodeHTML: React.FC<{ data: string, className: string, }> = ({ data, className, }) => {
  const decodedBody = useMemo(() => decodeUnicode(data), [data]);
  return (
    <div className={className}
      dangerouslySetInnerHTML={{ __html: decodedBody }}
    />
  );
}