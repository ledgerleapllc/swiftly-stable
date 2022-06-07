import { ReactComponent as CheckBox } from 'assets/icons/check-box.svg';
import { ReactComponent as TermsOfServiceIcon } from 'assets/icons/termsofservice.svg';
import { ReactComponent as UnCheckBox } from 'assets/icons/uncheck-box.svg';
import React, { useState } from 'react';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const TermsOfService = ({ close }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-7.5 px-12.5' showCloseBtn={false} close={close}>
      <Dialog.Header className='flex items-center gap-4'>
        <TermsOfServiceIcon />
        <div>
          <p className='text-xl'>Terms of Service</p>
          <p className='text-xs pt-1.25'>Last Updated: May 6, 2022</p>
        </div>
      </Dialog.Header>
      <Dialog.Body className='mt-7.5'>
        <div className='max-h-[352px] overflow-auto'>
          <p className='text-xs font-medium sticky top-0 left-0 bg-white'>1. Terms</p>
          <p className='pt-2 text-[10px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Cum sociis natoque
            penatibus et magnis. Urna nunc id cursus metus aliquam eleifend mi in nulla. Ut tortor pretium viverra
            suspendisse potenti nullam ac tortor vitae. Praesent semper feugiat nibh sed pulvinar. Nunc faucibus a
            pellentesque sit amet porttitor. Adipiscing diam donec adipiscing tristique risus nec feugiat. Blandit
            turpis cursus in hac habitasse platea dictumst quisque sagittis. Fermentum leo vel orci porta non pulvinar.
            Maecenas volutpat blandit aliquam etiam erat velit. Est ante in nibh mauris cursus mattis. Lacus sed viverra
            tellus in. Ipsum dolor sit amet consectetur adipiscing elit ut. Amet commodo nulla facilisi nullam vehicula
            ipsum. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Non curabitur gravida arcu ac tortor
            dignissim convallis. Quis eleifend quam adipiscing vitae proin sagittis nisl. Augue eget arcu dictum varius.
            Mi sit amet mauris commodo quis imperdiet massa tincidunt. Maecenas accumsan lacus vel facilisis volutpat
            est velit egestas dui. Lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis. Amet massa
            vitae tortor condimentum lacinia. Praesent semper feugiat nibh sed pulvinar. Nunc faucibus a pellentesque
            sit amet porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Dignissim enim sit amet venenatis urna cursus eget nunc
            scelerisque. Cum sociis natoque penatibus et magnis. Urna nunc id cursus metus aliquam eleifend mi in nulla.
            Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Praesent semper feugiat nibh sed
            pulvinar. Nunc faucibus a pellentesque sit amet porttitor. Adipiscing diam donec adipiscing tristique risus
            nec feugiat. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Fermentum leo vel orci
            porta non pulvinar. Maecenas volutpat blandit aliquam etiam erat velit. Est ante in nibh mauris cursus
            mattis. Lacus sed viverra tellus in. Ipsum dolor sit amet consectetur adipiscing elit ut. Amet commodo nulla
            facilisi nullam vehicula ipsum. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Non
            curabitur gravida arcu ac tortor dignissim convallis. Quis eleifend quam adipiscing vitae proin sagittis
            nisl. Augue eget arcu dictum varius. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Maecenas
            accumsan lacus vel facilisis volutpat est velit egestas dui. Lacus laoreet non curabitur gravida arcu ac
            tortor dignissim convallis. Amet massa vitae tortor condimentum lacinia. Praesent semper feugiat nibh sed
            pulvinar. Nunc faucibus a pellentesque sit amet porttitor. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim enim sit amet
            venenatis urna cursus eget nunc scelerisque. Cum sociis natoque penatibus et magnis. Urna nunc id cursus
            metus aliquam eleifend mi in nulla. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae.
            Praesent semper feugiat nibh sed pulvinar. Nunc faucibus a pellentesque sit amet porttitor. Adipiscing diam
            donec adipiscing tristique risus nec feugiat. Blandit turpis cursus in hac habitasse platea dictumst quisque
            sagittis. Fermentum leo vel orci porta non pulvinar. Maecenas volutpat blandit aliquam etiam erat velit. Est
            ante in nibh mauris cursus mattis. Lacus sed viverra tellus in. Ipsum dolor sit amet consectetur adipiscing
            elit ut. Amet commodo nulla facilisi nullam vehicula ipsum. Vel risus commodo viverra maecenas accumsan
            lacus vel facilisis. Non curabitur gravida arcu ac tortor dignissim convallis. Quis eleifend quam adipiscing
            vitae proin sagittis nisl. Augue eget arcu dictum varius. Mi sit amet mauris commodo quis imperdiet massa
            tincidunt. Maecenas accumsan lacus vel facilisis volutpat est velit egestas dui. Lacus laoreet non curabitur
            gravida arcu ac tortor dignissim convallis. Amet massa vitae tortor condimentum lacinia. Praesent semper
            feugiat nibh sed pulvinar. Nunc faucibus a pellentesque sit amet porttitor.
          </p>
        </div>
        <button className='flex gap-2 pt-7.5 pb-6.25 text-sm items-center' onClick={() => setIsChecked(!isChecked)}>
          {isChecked ? <CheckBox /> : <UnCheckBox />}
          <p>I have read and agree to the terms of use.</p>
        </button>
      </Dialog.Body>
      <Dialog.Footer className='flex mt-4 justify-between gap-4'>
        <Button variant='outline' className='w-full' onClick={handleCancel}>
          Decline
        </Button>
        <Button className='w-full' onClick={handleCancel}>
          I Agree
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default TermsOfService;
