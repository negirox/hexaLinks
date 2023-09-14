import * as React from 'react';
import styles from './Hexalinks.module.scss';
import { IHexalinksProps } from './IHexalinksProps';
import { HexLinksModel } from '../../../models/HexLinksModel';
import { IHexalinksState } from './IHexalinksState';
import { ResponseValue } from '../../../models/ResponseValue';
import('./Hexalinks.css');
const LinksCount = 6;
export default class Hexalinks extends React.Component<IHexalinksProps, IHexalinksState> {
  constructor(props: IHexalinksProps, state: IHexalinksState) {
    super(props);
    this.state = {
      records: new Array<HexLinksModel>(),
      loading: true,
      errors: new Array<string>()
    }
  }
  public async componentDidMount(): Promise<void> {
    await this.fetchData().then(x => {
      console.log("Data fetched");
    })
  }
  private async fetchData(): Promise<void> {
    const items: ResponseValue[] = await this.props.service.getListItems(this.props.listName, this.props.columns, null);
    if (items !== undefined && items.length >= LinksCount) {
      const hexLinks: HexLinksModel[] = [];
      if (items !== undefined && items.length > 0) {
        for (let index = 0; index < items.length; index++) {
          const item: ResponseValue = items[index];
          if (item !== null) {
            const qLinks = new HexLinksModel();
            qLinks.IconName = item.IconName === (undefined || null) ? 'link' : item.IconName;
            qLinks.Id = item.Id?.toString();
            qLinks.Title = item.Title;
            qLinks.QuickLinkUrl = item.QuickLinkUrl;
            qLinks.Order = item.ItemOrder;
            qLinks.Target = item.QuickLinkUrl;
            qLinks.ForeGroundColor = item.ForeGroundColor;
            qLinks.BackgroundColor = item.BackgroundColor;
            qLinks.BackgroundImageURL = item.BackgroundImageURL;
            qLinks.Display = item.Display;
            hexLinks.push(qLinks);
          }
        }
        this.setState({ records: hexLinks, loading: false });
      }
    }
    else {
      console.log("Please enter data in hexagon links");
    }
  }
  public GetItemInOrder(order: number): HexLinksModel {
    return this.state.records.filter(x => x.Order === order)[0];
  }
  public render(): React.ReactElement<IHexalinksProps> {
    return this.props.showOnlyInfo ? this.ShowOnlyHexaGonWithPopUp() : this.ShowImageInHexagonCenter();
  }
  ShowOnlyHexaGonWithPopUp(): JSX.Element {
    return (
      <div className="root">
        <div className="hex-wrap">
          <div className='hex tar negr visiblityHidden' data-h2='Jeff Buzz'></div>
          <div className='hex a1 visiblityHidden' data-h1='Our'></div>
          <div className='hex a2 visiblityHidden' data-h1='Team'></div>
          <div className='hex a3 visiblityHidden' data-h2='Jisim Dove'></div>

          {/* <div className='hex a2'></div> */}
          <div className="hex hex-layer" id='m0'>
            <div className='hex slide-reveal' data-h3='Simar, Project Lead'></div>
            <a className='hex' href='#m0'
              style={{ backgroundImage: `url("https://delphime.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=mnegi@delphime.com")` }}></a>
          </div>
          {/* <div className="hex hex-layer" id='m1'>
          <div className='hex slide-reveal' data-h3='Jeff, CEO'></div>
          <a className='hex' href='#m1'></a>
        </div> */}
          <div className="hex hex-layer" id='m1'>
            <div className='hex slide-reveal' data-h3='Simar, Project Lead'></div>
            <a className='hex' href='#m1'
              style={{ backgroundImage: `url("https://delphime.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=mnegi@delphime.com")` }}></a>
          </div>

          <div className="hex hex-layer" id='m2'>
            <div className='hex slide-reveal' data-h3='Jisim, Design lead'></div>
            <a className='hex tot' href='#m2'
              style={{ backgroundImage: `url("https://delphime.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=mnegi@delphime.com")` }}></a>
          </div>


          <div className='hex a2 visiblityHidden'></div>

          {/* <div className='hex tar' data-h2='Simar Chan'></div> */}
          <div className="hex hex-layer" id='m5'>
            <div className='hex slide-reveal' data-h3='Simar, Project Lead'></div>
            <a className='hex' href='#m5'
              style={{ backgroundImage: `url("https://delphime.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=mnegi@delphime.com")` }}></a>
          </div>

          <div className="hex hex-layer" id='m3'>
            <div className='hex slide-reveal' data-h3='Simar, Project Lead'></div>
            <a className='hex' href='#m3'
              style={{ backgroundImage: `url("https://delphime.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=mnegi@delphime.com")` }}></a>
          </div>

          <div className="hex hex-layer" id="m4">
            <div className='hex slide-reveal' data-h3='Tim, Developer'></div>
            <a className='hex tob' href='#m4'
              style={{ backgroundImage: `url("https://delphime.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=mnegi@delphime.com")` }}></a>
          </div>
          <div className='hex negr visiblityHidden' data-h2='Tim Lake'></div>

          <div className='hex a1 visiblityHidden'></div>
          <div className="hex hex-layer" id='m6'>
            <div className='hex slide-reveal' data-h3='Simar, Project Lead'></div>
            <a className='hex' href='#m6'
              style={{ backgroundImage: `url("https://delphime.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=mnegi@delphime.com")` }}></a>
          </div>
          <div className='hex a1 visiblityHidden'></div>

          <a href='#' className="overlay"></a>
        </div>
      </div>
    )
  }

  /* private ShowOnlyHexaGonWithPopUp(): JSX.Element {
    let middleItem: HexLinksModel = null;
    let firstItem: HexLinksModel = null;
    let secondItem: HexLinksModel = null;
    let thirdItem: HexLinksModel = null;
    let fourthItem: HexLinksModel = null;
    let fifthItem: HexLinksModel = null;
    let sixthItem: HexLinksModel = null;

    if (this.state.records.length > LinksCount) {
      middleItem = this.GetItemInOrder(7);
      firstItem = this.GetItemInOrder(1); //this.state.records[0];
      secondItem = this.GetItemInOrder(2); // this.state.records[1];
      thirdItem = this.GetItemInOrder(3); //this.state.records[2];
      fourthItem = this.GetItemInOrder(4); // this.state.records[3];
      fifthItem = this.GetItemInOrder(5); //this.state.records[4];
      sixthItem = this.GetItemInOrder(6);
    }
    return (
      <section className={styles.hexalinks} style={{
        backgroundColor: this.props.backgroundColor,
      }}>
        {this.state.records.length < LinksCount ? <>Please enter atleast 7 links</> : ""}
        {this.state.records.length >= LinksCount && <div className="root">
          <div className="hex-wrap">
            <div className='hex tar negr visiblityHidden' />
            <div className='hex a1 visiblityHidden' />
            <div className='hex a2 visiblityHidden' />
            <div className='hex a3 visiblityHidden' />

            <div className="hex hex-layer" id='six1'>
              <div className='hex slide-reveal' style={{
                visibility: sixthItem.Display === true ? 'visible' : 'hidden'
              }} data-h3={sixthItem.Title}>
                <a href="#six1" className="hex"
                  style={{
                    backgroundImage: `url("${sixthItem.BackgroundImageURL}")`,
                    textDecoration: 'none'
                  }} rel="noreferrer" />
      
              </div>
            </div>
            <div className="hex hex-layer" id='m1'>
              <div className='hex slide-reveal' style={{
                backgroundColor: firstItem.BackgroundColor,
                visibility: firstItem.Display === true ? 'visible' : 'hidden'
              }}>
                <a href={firstItem.QuickLinkUrl} className="spanText"
                  style={{
                    color: firstItem.ForeGroundColor ?? 'inherit',
                    textDecoration: 'none'
                  }} target='_blank' rel="noreferrer">{firstItem.Title}</a>
              </div>
            </div>

            <div className="hex hex-layer" id='m2'>
              <div className='hex slide-reveal' style={{
                backgroundColor: secondItem.BackgroundColor,
                visibility: secondItem.Display === true ? 'visible' : 'hidden'
              }}>
                <a href={secondItem.QuickLinkUrl} className="spanText"
                  style={{
                    color: secondItem.ForeGroundColor ?? 'inherit',
                    textDecoration: 'none'
                  }} target='_blank' rel="noreferrer">{secondItem.Title}</a>
              </div>
            </div>

            <div className='hex a2 visiblityHidden' />
            <div className='hex slide-reveal' style={{
              backgroundColor: fifthItem.BackgroundColor,
              visibility: fifthItem.Display === true ? 'visible' : 'hidden'
            }}>
              <a href={fifthItem.QuickLinkUrl} className="spanText"
                style={{
                  color: fifthItem.ForeGroundColor ?? 'inherit',
                  textDecoration: 'none'
                }} target='_blank' rel="noreferrer">{fifthItem.Title}</a>
            </div>

            <div className="hex hex-layer" id='m3'>
              <div className='hex slide-reveal' style={{
                backgroundColor: middleItem.BackgroundColor,
                visibility: middleItem.Display === true ? 'visible' : 'hidden'
              }}>
                <a href={middleItem.QuickLinkUrl} className="spanText"
                  style={{
                    color: middleItem.ForeGroundColor ?? 'inherit',
                    textDecoration: 'none'
                  }} target='_blank' rel="noreferrer">{middleItem.Title}</a>
              </div>
            </div>

            <div className="hex hex-layer" id="m4">
              <div className='hex slide-reveal' style={{
                backgroundColor: thirdItem.BackgroundColor,
                visibility: thirdItem.Display === true ? 'visible' : 'hidden'
              }}>
                <a href={thirdItem.QuickLinkUrl} className="spanText"
                  style={{
                    color: thirdItem.ForeGroundColor ?? 'inherit',
                    textDecoration: 'none'
                  }} target='_blank' rel="noreferrer">{thirdItem.Title}</a>
              </div>
            </div>
            <div className='hex negr visiblityHidden' />

            <div className='hex a1 visiblityHidden' />
            <div className='hex slide-reveal' style={{
              backgroundColor: fourthItem.BackgroundColor,
              visibility: fourthItem.Display === true ? 'visible' : 'hidden'
            }}>
              <a href={fourthItem.QuickLinkUrl} className="spanText"
                style={{
                  color: fourthItem.ForeGroundColor ?? 'inherit',
                  textDecoration: 'none'
                }} target='_blank' rel="noreferrer">{fourthItem.Title}</a>
            </div>
            <div className='hex a1 visiblityHidden' />
          </div>
        </div>}
      </section>
    );
  }
   */
  /*   private ShowOnlyHexaGon(): JSX.Element {
      let middleItem: HexLinksModel = null;
      let firstItem: HexLinksModel = null;
      let secondItem: HexLinksModel = null;
      let thirdItem: HexLinksModel = null;
      let fourthItem: HexLinksModel = null;
      let fifthItem: HexLinksModel = null;
      let sixthItem: HexLinksModel = null;
  
      if (this.state.records.length > LinksCount) {
        middleItem = this.GetItemInOrder(7);
        firstItem = this.GetItemInOrder(1); //this.state.records[0];
        secondItem = this.GetItemInOrder(2); // this.state.records[1];
        thirdItem = this.GetItemInOrder(3); //this.state.records[2];
        fourthItem = this.GetItemInOrder(4); // this.state.records[3];
        fifthItem = this.GetItemInOrder(5); //this.state.records[4];
        sixthItem = this.GetItemInOrder(6);
      }
      return (
        <section className={styles.hexalinks} style={{ backgroundColor: this.props.backgroundColor }}>
          {this.state.records.length < LinksCount ? <>Please enter atleast 7 links</> : ""}
          {this.state.records.length >= LinksCount && <div className="root">
            <div className="hex-wrap">
              <div className='hex tar negr visiblityHidden' />
              <div className='hex a1 visiblityHidden' />
              <div className='hex a2 visiblityHidden' />
              <div className='hex a3 visiblityHidden' />
  
              <div className='hex slide-reveal' style={{
                backgroundColor: sixthItem.BackgroundColor,
                visibility: sixthItem.Display === true ? 'visible' : 'hidden'
              }}>
                <a href={sixthItem.QuickLinkUrl} className="spanText"
                  style={{
                    color: sixthItem.ForeGroundColor ?? 'inherit',
                    textDecoration: 'none'
                  }} target='_blank' rel="noreferrer">{sixthItem.Title}</a>
              </div>
              <div className="hex hex-layer" id='m1'>
                <div className='hex slide-reveal' style={{
                  backgroundColor: firstItem.BackgroundColor,
                  visibility: firstItem.Display === true ? 'visible' : 'hidden'
                }}>
                  <a href={firstItem.QuickLinkUrl} className="spanText"
                    style={{
                      color: firstItem.ForeGroundColor ?? 'inherit',
                      textDecoration: 'none'
                    }} target='_blank' rel="noreferrer">{firstItem.Title}</a>
                </div>
              </div>
  
              <div className="hex hex-layer" id='m2'>
                <div className='hex slide-reveal' style={{
                  backgroundColor: secondItem.BackgroundColor,
                  visibility: secondItem.Display === true ? 'visible' : 'hidden'
                }}>
                  <a href={secondItem.QuickLinkUrl} className="spanText"
                    style={{
                      color: secondItem.ForeGroundColor ?? 'inherit',
                      textDecoration: 'none'
                    }} target='_blank' rel="noreferrer">{secondItem.Title}</a>
                </div>
              </div>
  
              <div className='hex a2 visiblityHidden' />
              <div className='hex slide-reveal' style={{
                backgroundColor: fifthItem.BackgroundColor,
                visibility: fifthItem.Display === true ? 'visible' : 'hidden'
              }}>
                <a href={fifthItem.QuickLinkUrl} className="spanText"
                  style={{
                    color: fifthItem.ForeGroundColor ?? 'inherit',
                    textDecoration: 'none'
                  }} target='_blank' rel="noreferrer">{fifthItem.Title}</a>
              </div>
  
              <div className="hex hex-layer" id='m3'>
                <div className='hex slide-reveal' style={{
                  backgroundColor: middleItem.BackgroundColor,
                  visibility: middleItem.Display === true ? 'visible' : 'hidden'
                }}>
                  <a href={middleItem.QuickLinkUrl} className="spanText"
                    style={{
                      color: middleItem.ForeGroundColor ?? 'inherit',
                      textDecoration: 'none'
                    }} target='_blank' rel="noreferrer">{middleItem.Title}</a>
                </div>
              </div>
  
              <div className="hex hex-layer" id="m4">
                <div className='hex slide-reveal' style={{
                  backgroundColor: thirdItem.BackgroundColor,
                  visibility: thirdItem.Display === true ? 'visible' : 'hidden'
                }}>
                  <a href={thirdItem.QuickLinkUrl} className="spanText"
                    style={{
                      color: thirdItem.ForeGroundColor ?? 'inherit',
                      textDecoration: 'none'
                    }} target='_blank' rel="noreferrer">{thirdItem.Title}</a>
                </div>
              </div>
              <div className='hex negr visiblityHidden' />
  
              <div className='hex a1 visiblityHidden' />
              <div className='hex slide-reveal' style={{
                backgroundColor: fourthItem.BackgroundColor,
                visibility: fourthItem.Display === true ? 'visible' : 'hidden'
              }}>
                <a href={fourthItem.QuickLinkUrl} className="spanText"
                  style={{
                    color: fourthItem.ForeGroundColor ?? 'inherit',
                    textDecoration: 'none'
                  }} target='_blank' rel="noreferrer">{fourthItem.Title}</a>
              </div>
              <div className='hex a1 visiblityHidden' />
            </div>
          </div>}
        </section>
      );
    } */

  private ShowImageInHexagonCenter(): JSX.Element {
    let middleItem: HexLinksModel = null;
    let firstItem: HexLinksModel = null;
    let secondItem: HexLinksModel = null;
    let thirdItem: HexLinksModel = null;
    let fourthItem: HexLinksModel = null;
    let fifthItem: HexLinksModel = null;
    let sixthItem: HexLinksModel = null;

    if (this.state.records.length > LinksCount) {
      middleItem = this.GetItemInOrder(7);
      firstItem = this.GetItemInOrder(1); //this.state.records[0];
      secondItem = this.GetItemInOrder(2); // this.state.records[1];
      thirdItem = this.GetItemInOrder(3); //this.state.records[2];
      fourthItem = this.GetItemInOrder(4); // this.state.records[3];
      fifthItem = this.GetItemInOrder(5); //this.state.records[4];
      sixthItem = this.GetItemInOrder(6);
    }
    return (
      <section className={styles.hexalinks} style={{ backgroundColor: this.props.backgroundColor }}>
        {this.state.records.length < LinksCount ? <>Please enter atleast 7 links</> : ""}
        {this.state.records.length >= LinksCount && <div className="root">

          <div className="hex-wrap">
            <div className='hex tar negr visiblityHidden' data-h2='Jeff Buzz'></div>
            <div className='hex a1 visiblityHidden' data-h1='Our'></div>
            <div className='hex a2 visiblityHidden' data-h1='Team'></div>
            <div className='hex a3 visiblityHidden' data-h2='Jisim Dove'></div>
            <div className='hex slide-reveal' style={{
              backgroundColor: sixthItem.BackgroundColor,
              visibility: sixthItem.Display === true ? 'visible' : 'hidden'
            }}>
              <a href={sixthItem.QuickLinkUrl} className="spanText"
                style={{
                  color: sixthItem.ForeGroundColor ?? 'inherit',
                  textDecoration: 'none'
                }} target='_blank' rel="noreferrer">{sixthItem.Title}</a>
            </div>
            <div className="hex hex-layer" id='m1'>
              <div className='hex slide-reveal' style={{
                backgroundColor: firstItem.BackgroundColor,
                visibility: firstItem.Display === true ? 'visible' : 'hidden'
              }}>
                <a href={firstItem.QuickLinkUrl} className="spanText"
                  style={{
                    color: firstItem.ForeGroundColor ?? 'inherit',
                    textDecoration: 'none'
                  }} target='_blank' rel="noreferrer">{firstItem.Title}</a>
              </div>
            </div>

            <div className="hex hex-layer" id='m2'>
              <div className='hex slide-reveal' style={{
                backgroundColor: secondItem.BackgroundColor,
                visibility: secondItem.Display === true ? 'visible' : 'hidden'
              }}>
                <a href={secondItem.QuickLinkUrl} className="spanText"
                  style={{
                    color: secondItem.ForeGroundColor ?? 'inherit',
                    textDecoration: 'none'
                  }} target='_blank' rel="noreferrer">{secondItem.Title}</a>
              </div>
            </div>


            <div className='hex a2 visiblityHidden'></div>
            <div className='hex slide-reveal' style={{
              backgroundColor: fifthItem.BackgroundColor,
              visibility: fifthItem.Display === true ? 'visible' : 'hidden'
            }}>
              <a href={fifthItem.QuickLinkUrl} className="spanText"
                style={{
                  color: fifthItem.ForeGroundColor ?? 'inherit',
                  textDecoration: 'none'
                }} target='_blank' rel="noreferrer">{fifthItem.Title}</a>
            </div>

            <div className="hex hex-layer" id='m3'>
              <div className='hex slide-reveal' data-h3={middleItem.Title}></div>
              <span className='hex bgImage'></span>
            </div>

            <div className="hex hex-layer" id="m4">
              <div className='hex slide-reveal' style={{
                backgroundColor: thirdItem.BackgroundColor,
                visibility: thirdItem.Display === true ? 'visible' : 'hidden'
              }}>
                <a href={thirdItem.QuickLinkUrl} className="spanText"
                  style={{
                    color: thirdItem.ForeGroundColor ?? 'inherit',
                    textDecoration: 'none'
                  }} target='_blank' rel="noreferrer">{thirdItem.Title}</a>
              </div>
            </div>
            <div className='hex negr visiblityHidden' data-h2='Tim Lake'></div>

            <div className='hex a1 visiblityHidden'></div>
            <div className='hex slide-reveal' style={{
              backgroundColor: fourthItem.BackgroundColor,
              visibility: fourthItem.Display === true ? 'visible' : 'hidden'
            }}>
              <a href={fourthItem.QuickLinkUrl} className="spanText"
                style={{
                  color: fourthItem.ForeGroundColor ?? 'inherit',
                  textDecoration: 'none'
                }} target='_blank' rel="noreferrer">{fourthItem.Title}</a>
            </div>
            <div className='hex a1 visiblityHidden'></div>

            <a href='#' className="overlay"></a>
          </div>
        </div>
        }
      </section>
    );
  }
}
