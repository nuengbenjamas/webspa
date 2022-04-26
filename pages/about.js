import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import Narbar from '../narbar'

const features = [
  {
    name: 'จำหน่ายแบบดอก',
    description:
      'มีดอกไม้ให้เลือกหลากหลายชนิด ราคาขึ้นอยู่กับแต่ละประเภท',
    icon: GlobeAltIcon,
  },
  {
    name: 'จำหน่ายแบบช่อ',
    description:
      'สามารถเลือกชนิดดอกไม้ได้ตามความต้องการ ราคาขึ้นอยู่กับขนาดของช่อที่จัด',
    icon: ScaleIcon,
  },
  {
    name: 'รับจัดดอกไม้ตามงานต่าง ๆ',
    description:
      'สั่งได้ตามต้องการหรือจะให้ทางร้านออกแบบให้ตามความเหมาะสมของงาน',
    icon: LightningBoltIcon,
  },
  {
    name: 'ติดต่อ',
    description:
      'ที่อยู่: มหาวิทยาลัยสงขลานครินทร์ ภูเก็ต เบอร์โทร: 093 398 3291',
    icon: AnnotationIcon,
  },
]

export default function About() {
  return (
    <div className="py-12 bg-white">
      <Narbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Web SPA Project in DCW 2/2564</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Nueng Flower Store online Shopping
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          บริการจำหน่ายดอกไม้ทั้งแบบดอกและช่อ รับจัดช่อดอกไม้ ในโอกาสต่าง ๆ
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
